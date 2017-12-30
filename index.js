const Discord = require("discord.js");
const PREFIX = "t;";
const YTDL = require("ytdl-core");
const antispam = require("discord-anti-spam");
const db = require("quick.db")
const economy = require("discord-eco")
const YouTube = require("simple-youtube-api")
const fortnite = require("fortnite")
const superagent = require("superagent")
const moment = require("moment")
const fs = require("fs")

var bot = new Discord.Client();

const modrole = "Modérateur";

var client = new Discord.Client();

const youtube = new YouTube("AIzaSyDE684AY4Th50yKvN7lZ9GroJiFvF5yjy8");

const queue = new Map();

function generateHex() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

var roll = Math.floor(Math.random() * 99999) + 1;

var fortunes = [
    "Oui.",
    "Non.",
    "Sûrment.",
    "Je ne pense pas.",
    "T'es malade ou quoi ? Jamais mec.",
    "Aspèrge",
    "Je sais pas.",
    "Pourquoi tu me demandes ça ?"
];


var servers = {};

bot.on("ready", function () {
        bot.user.setActivity("t;help | Tequilaz <3", {url:"https://www.twitch.tv/powa_tequilaz", type: "STREAMING"})
    console.log("Je suis prêt à me rendre sur " + bot.guilds.size + " serveur(s) ! Sous le pseudo de " + bot.user.username + " !");
});

bot.on("guildMemberAdd", function(member) {
member.send(`Bienvenue sur le serveur de la TequiFamily ! Pour avoir accès aux différents channel du Discord je t'invite à lire le #a_lire_regles ! Si tu as une question contacte un Admin en MP :)`)
});

bot.on("guildMemberRemove", function(member) {

});

bot.on("message", async function(message) {

    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;
    
    if (message.channel.name = "demande_de_roles") return message.delete()
    
    if (message.channel.type === "dm") return message.reply("Salut " + message.author.username + ", je suis désolé mais je ne peux pas répondre en MP.");

    var args = message.content.substring(PREFIX.length).split (" ");

    var args2 = message.content.split(" ").slice(1);

    var suffix = args2.join(" ");

    var reason = args2.slice(1).join(" ");

    var user = message.mentions.users.first();

    var guild = message.guild;

    var member = message.member;

    var rolemodo = member.guild.roles.find("name", "Modérateur")

    var rolehelper = member.guild.roles.find("name", "Helper")

    var roleyoutube = member.guild.roles.find("name", "YOUTUBE")
    
    var rolefriend = member.guild.roles.find("name", "AMIGO")

    var reasontimed = args2.slice(2).join(' ')

    var roleMute = member.guild.roles.find("name", "Mute")

    var rolesub = member.guild.roles.find("name", "Abonnés")

    var modlog = member.guild.channels.find("name", "tequilog")

    var midlemanrole = member.guild.roles.find("name", "Middleman")

    var regleschannel = member.guild.channels.find("name", "regles")

    var tequiregles = member.guild.channels.find("name", "a_lire_regles")

    var cont = message.content.slice(PREFIX.length).split(" ");

    var args3 = cont.slice(1);
    
    const serverQueue = queue.get(message.guild.id);

    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    switch (args[0].toLowerCase()) {
        case "call":     
function roll() {
    return Math.floor(Math.random() * 999) + 1;
 }
        if(!user) return message.channel.send("Tu n'as pas précisé avec qui tu veux Trade.")
        if (reason.length < 1) return message.reply("Tu as oublié de précisé l'échange. `Exemple : t;call @Utilisateur 10k pour Slipstream`");
        message.guild.createChannel(`call-${roll()}`, 'text').then(m => m.overwritePermissions(message.author, {
            VIEW_CHANNEL: true
           }))
           .then(m => m.overwritePermissions(message.guild.id, {
            VIEW_CHANNEL: false
           }))
           .then(m => m.overwritePermissions(user, {
            VIEW_CHANNEL: true
           }))
           .then(m => {
            m.send(`Merci d'attendre un membre du Staff ${message.author.toString()} et ${user.toString()}, une membre du Staff arrivera le plus vite possible !`)
            var embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            .addField("Numéro de la demande", m.name.split("-").slice(1))
            .addField("Auteurs de la demande", `${message.author.toString()} et ${user.toString()}`)
            .setColor("0x949555")
            member.guild.channels.find("name", "middleman-claim").send(embed)
           })

        break;
        case "close":
        if(!message.channel.name.startsWith("call-")) return message.channel.send("Tu dois être dans un channel d'appel des Middlemans.")
        if (!message.member.roles.find("name", "Middleman")) {
            message.channel.send("Tu as besoin du role `" + "Middleman" + "` pour faire cette commande.");
        return;
        }
        setTimeout(() => { message.channel.delete() }, 10000);
        message.channel.send("Ce channel sera supprimé dans `10 secondes`.")
        break;
        case "claim":
        if (!message.member.roles.find("name", "Middleman")) {
            message.channel.send("Tu as besoin du role `" + "Middleman" + "` pour faire cette commande.");
        return;
        }
           if(!args2[0]) return message.channel.send("Tu as oublié le numéro de la demande.")
           if(!member.guild.channels.find("name", `call-${args2[0]}`)) return message.channel.send(`Je ne trouve pas de channel nommé call-${args2[0]}`)
           var embed = new Discord.MessageEmbed()
           .setImage(message.author.avatarURL)
           .setTimestamp()
           .addField("Un staff est arrivé !", `Le membre du staff ${message.author.toString()} est arrivé pour t'aider, pose lui ta question !`)
           .setColor("0x3d5ac0")
           member.guild.channels.find("name", `call-${args2[0]}`).overwritePermissions(message.author, {
            VIEW_CHANNEL: true
           })
           member.guild.channels.find("name", `call-${args2[0]}`).send(embed)
        break;
        case "unmute":
        if (!message.member.roles.find("name", "Admins")) {
                    message.channel.send("Tu as besoin du role `" + "Admins" + "` pour faire cette commande.");
                return;
                }
        if(!modlog) return message.reply("Je ne trouve pas de channel tequilog.");
        var member = message.mentions.members.first();
        if (message.mentions.users.size < 1) return message.reply("Tu as oublié de préciser qui je dois unmute.")
        if (reason.length < 1) return message.reply("Tu as oublié la raison.");
        member.removeRole(rolemute)
        message.channel.send("Il a bien été unmute")

        var embed = new Discord.MessageEmbed()
        .addField("Action :", "Unmute")
        .addField("Utilisateur :", user.toString())
        .addField("Modérateur :", message.author.toString())
        .addField("Raison :", reason)
        .setColor(0x808000)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTimestamp()
        member.guild.channels.find("name", "tequilog").send(embed);
        break;
        case "mute":
        if (!message.member.roles.find("name", "Admins")) {
            message.channel.send("Tu as besoin du role `" + "Admins" + "` pour faire cette commande.");
        return;
        }
        if(!modlog) return message.reply("Je ne trouve pas de channel tequilog.");  
        let time = parseInt(args2[1]) * 60000;
        if(!time) return message.reply("Tu as oublié le temps.")
        if (!reasontimed) return message.reply("Tu as oublié la raison.")
        var member = message.mentions.members.first();
        if (message.mentions.users.size < 1) return message.reply("Tu as oublié de préciser qui je dois Mute.")
        message.channel.send(member.toString() + " a bien été mute. ✅")
        member.addRole(roleMute)
        setTimeout(() => { member.removeRole(roleMute); }, time);

        var embed = new Discord.MessageEmbed()
        .addField("Action :", "Mute")
        .addField("Utilisateur :", user.toString())
        .addField("Modérateur :", message.author.toString())
        .addField("Raison :", reasontimed)
        .addField("Temps :", args2[1] + " minute(s)")
        .setColor(0x808000)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTimestamp()
        member.guild.channels.find("name", "tequilog").send(embed);
        break;
        case "rank":
        if (message.channel.name != "demande_de_roles") return message.delete()
        if (message.member.roles.find("name", "Abonnés")) {
            message.delete()
        return;
        }
            member.addRole(rolesub)
            message.delete()
            var embed = new Discord.MessageEmbed()
            .addField("Action :", "Ajout du role abonnés à un utilisateur")
            .addField("Abonnés :", message.author.toString())
            .setColor(0x00ffff)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            member.guild.channels.find("name", "tequilog").send(embed);
            break;
        case "ping":
            message.channel.send(`Pong !`);
            break;
        case "help":
            member.send(`
__***Commandes disponibles sur le bot.***__

__**General**__

**help** : Message que tu vois maintenant !
**ping** : Voir ton ping !
**rank** Recevoir ton role Abonnés après avoir lu le channel #a_lire_regles !

__**Musique**__
**play** : Ajouté une musique à la playlist, sois l'a joué sur le champ. Utilisation : t;play <lien / nom de la musique>
**stop** : Arrêté la / les musique(s) en cours.
**skip** : Passer à la musique suivante.
**queue** : Voir les musiques dans la playlist.
**volume** : Changer le volume. Utilisation : t;volume <1 / 2 / 3 / 4 / 5>. Vous n'êtes pas obligé de mettre un nombre, si vous n'en mettez pas, le bot vous montrera le volume courent.
**np** : Voir la musique en cours.
**pause** : Mettre la musique en pause.
**unpause** : Redémarrer la musique.

__**Informations**__
**photo** : Voir la photo de profil de quelqu'un. Utilsation : t;photo @utilisateur
**userinfo** : Informations sur un utilisateur. Utilisation : t;userinfo @utilisateur
**serverinfo** : Informations sur le serveur sur le quel tu te trouves.

__**Modération**__
**ban** : Bannir un utilisateur. Utilisation : t;ban @utilisateur <raison>
**kick** : Kick un utilisateur. Utilisation : t;kick @utilisateur <raison>
**mute** : Mute un utilisateur. Utilisation : t;mute @utilisatuer <temps en minutes> <raison>
**unmute** : Unmute un utilisateur. Utilisation : t;unmute @utilisateur
**purge** : Supprimer un certain nombre de messages. Utilisation : t;purge <nombre de messages (minimum 2 et maximum 100).>
            `)
            message.react("✅")
            message.channel.send(member.toString() + " Je t'ai envoyé les commandes en MP !")
            break;
        case "userinfo":
            if (message.mentions.users.size < 1) return message.reply("Tu as oublié de préciser de qui je dois montrer les informations.")
            var embed = new Discord.MessageEmbed()
                .addField("Pseudo", user.tag)
                .addField("ID", user.id)
                .addField("Compte créer le", user.createdAt)
                .addField("Roles", message.guild.member(user).roles.sort().map(role => role).join(" | "))
                .setThumbnail(user.avatarURL)
                .setColor(0xff80ff)
                .setAuthor(message.author.username, message.author.avatarURL)
                .setFooter("Voilà.", message.author.avatarURL)
                .setTimestamp()
            message.channel.send(embed);
            break;
        case "photo":
            if (message.mentions.users.size < 1) return message.reply("Tu as oublié de préciser de qui je dois montrer la photo de profil.")
            var embed = new Discord.MessageEmbed()
            .addField("Photo de profil de", user.toString())
            .setImage(user.avatarURL())
            message.channel.send(embed)
            break;
        case "kick":
            if (!message.member.roles.find("name", modrole)) {
                    message.channel.send("Tu as besoin du role `" + modrole + "` pour faire cette commande.");
                return;
                }
            if(!modlog) return message.reply("Je ne trouve pas de channel tequilog.");
            if (message.mentions.users.size < 1) return message.reply("Tu as oublié de préciser qui je dois kick.")
            if (reason.length < 1) return message.reply("Tu as oublié la raison.");
            message.guild.member(user).kick();

            var embed = new Discord.MessageEmbed()
            .addField("Action :", "kick")
            .addField("Utilisateur :", user.toString())
            .addField("Modérateur :", message.author.toString())
            .addField("Raison :", reason)
            .setColor(0x800000)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            member.guild.channels.find("name", "tequilog").send(embed);
            break;
        case "ban":
            if (!message.member.roles.find("name", modrole)) {
                    message.channel.send("Tu as besoin du role `" + modrole + "` pour faire cette commande.");
                return;
                }
            if(!modlog) return message.reply("Je ne trouve pas de channel tequilog.");
            if (message.mentions.users.size < 1) return message.reply("Tu as oublié de préciser qui je dois bannir.")
            if (reason.length < 1) return message.reply("Tu as oublié la raison.");
            message.guild.ban(user, 2);

            var embed = new Discord.MessageEmbed()
            .addField("Action :", "ban")
            .addField("Utilisateur :", user.toString())
            .addField("Modérateur :", message.author.toString())
            .addField("Raison :", reason)
            .setColor(0x0000ff)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            member.guild.channels.find("name", "tequilog").send(embed);
            break;
        case "purge":
            if (!message.member.roles.find("name", modrole)) {
                    message.channel.send("Tu as besoin du role `" + modrole + "` pour faire cette commande.");
                return;
                }
            var messagecount = parseInt(args2.join(" "));
            message.channel.bulkDelete(messagecount);

            var embed = new Discord.MessageEmbed()
            .addField("Action :", "supression de messages")
            .addField("Modérateur :", message.author.toString())
            .addField("Nombre de messages :", messagecount)
            .setColor(0x0000ff)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            member.guild.channels.find("name", "tequilog").send(embed);
            break;
        case "serverinfo":
            var embed = new Discord.MessageEmbed()
            .setAuthor("Informations sur le serveur `" + message.guild.name + "`")
            .setThumbnail(message.guild.iconURL)
            .setFooter(message.guild.owner.user.tag, message.guild.owner.user.avatarURL)
            .addField("Membres", message.guild.memberCount)
            .addField("Channels", message.guild.channels.filter(chan => chan.type === "voice").size + " channels vocaux " + message.guild.channels.filter(chan => chan.type === "text").size + " channels textuels")
            .addField("Roles", message.guild.roles.map(role => role.toString()).join(" | "))
            .addField("Créateur", message.guild.owner.user.toString())
            .addField("Channel AFK", message.guild.afkChannel)
            .addField("Créer le", message.guild.createdAt)
            .addField("ID du serveur", message.guild.id)
            .addField("Region", message.guild.region)
            message.channel.send(embed)
            break;
            case "play":
            const searchString = args.slice(1).join(' ')
                    const voiceChannel = message.member.voiceChannel;
                    if (!voiceChannel) return message.channel.send("Tu dois être dans un channel vocal.");
                    const permissions = voiceChannel.permissionsFor(message.client.user)
                    if (!permissions.has('CONNECT')) {
                        return message.channel.send("Je ne peux pas rejoindre ton channel vocal.")
                    }
                    if (!permissions.has('SPEAK')) {
                        return message.channel.send("Je n'ai pas les permissions pour parler dans ton channel vocal.")
                    }
    
                    try {
                        var video = await youtube.getVideo(url);
                    } catch (error) {
                        try {
                            var videos = await youtube.searchVideos(searchString, 1);
                            var video = await youtube.getVideoByID(videos[0].id);
                        } catch (err) {
                            console.error(err)
                            return message.channel.send("Je ne parvient pas à trouver cela.");
                        }
                    }
                    console.log(video);
                    const song = {
                        id: video.id,
                        title: video.title,
                        url: `https://www.youtube.com/watch?v=${video.id}`,
                        thumbnail: `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`,
                    };
                    if (!serverQueue) {
                        const queueConstruct = {
                            textChannel: message.channel,
                            voiceChannel: voiceChannel,
                            connection: null,
                            songs: [],
                            volume: 5,
                            playing: true
                        };
                        queue.set(message.guild.id, queueConstruct);
    
                        queueConstruct.songs.push(song);
    
                        try {
                            var connection = await voiceChannel.join();
                            queueConstruct.connection = connection;
                            play(message.guild, queueConstruct.songs[0]);
                        } catch (error) {
                            console.error(`Je ne peux pas rejoindre le channel vocal : ${error}`)
                            queue.delete(message.guild.id);
                            return message.channel.send(`Je ne peux pas rejoindre le channel vocal : ${error}`)
                        }
                    } else {
                        serverQueue.songs.push(song);
                        console.log(serverQueue.songs);
                        var embed = new Discord.MessageEmbed()
                        .addField("Musique ajoutée à la queue :", `[${song.title}](${song.url}) | ${song.author}`)
                        .setTimestamp()
                        .setImage(song.thumbnail)
                        .setColor("0x0000ff")
                        .setFooter(`Suggésté par : ${message.author.username}`)
                        serverQueue.textChannel.send(embed)
                    }
            break;
        case "stop":
            if (!message.member.voiceChannel) return message.channel.send("Tu dois être dans un channel vocal pour faire cette commande.")
            if (!serverQueue) return message.channel.send("Rien n'est entrain d'être jouer alors je ne peux pas stop de son(s) !")
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end();
        break;
        case "skip":
        if (!message.member.voiceChannel) return message.channel.send("Tu dois être dans un channel vocal pour faire cette commande.")
                if (!serverQueue) return message.channel.send("Rien n'est entrain d'être jouer alors je ne peux pas skip de son !")
                    serverQueue.connection.dispatcher.end();
        break;
        case "np":
        if (!serverQueue) return message.channel.send("Rien n'est entrain d'être jouer")
        return message.channel.send(`Entrain d'être joué : **${serverQueue.songs[0].title}**`);
        break;
        case "volume":
            if (!message.member.voiceChannel) return message.channel.send("Tu dois être dans un channel vocal pour faire cette commande.")
            if (!serverQueue) return message.channel.send("Rien n'est entrain d'être joué.")
            if (!args[1]) return message.channel.send("Le volume courent est : **" + serverQueue.volume + "**");
            serverQueue.volume = args[1];
            serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
            return message.channel.send(`J'ai changer le volume pour : **${args[1]}**`)
        break;
        case "queue":
            if (!serverQueue) return message.channel.send("Rien n'est entrain d'être joué.");
            var embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .addField("Sons : ", `${serverQueue.songs.map(song => `**-** [${song.title}](${song.url})`).join('\n')}`)
        .addField("Maintenant jouée :", `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`)
        .setColor(generateHex())
        message.channel.send(embed)
        break;
        case "pause":
            if (serverQueue && serverQueue.playing) {
                serverQueue.playing = false;
                serverQueue.connection.dispatcher.pause();
                return message.channel.send("J'ai mis la music en pause !")
            }
            return message.channel.send("Rien n'est entrain d'être jouer.")
        break;
        case "unpause":
            if (serverQueue && !serverQueue.playing) {
                serverQueue.playing = true;
                serverQueue.connection.dispatcher.resume();
                return message.channel.send("Musique relancée !")
            }
            return message.channel.send("Rien n'est entrain d'être jouer.")
        break;
            default:
            message.channel.send("Commande invalide ^^")
    }
});

function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection.playStream(YTDL(song.url))
    .on('end', () => {
        console.log("Le son est fini !");
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
    })
    .on('error', error => console.error(error));
dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

var embed = new Discord.MessageEmbed()
.setTimestamp()
.addField("Musique jouée :", `[${song.title}](${song.url})`)
.setImage(song.thumbnail)
.setColor("0x00ff00")
serverQueue.textChannel.send(embed)
}

bot.login(process.env.TOKEN);
