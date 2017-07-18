const fs 		= require('fs'),
      util      = require('../utils/utils.js'),
      log   	= require('../utils/Logger.js'),
      list      = require('../data/warn.json'),
      Discord	= require('discord.js'),
      config    = require('../config.json');

module.exports = {
    help: 'Warns a user and log it or Check a user\'s warn count.',
    usage: '<mention> <-get/-clear>',
    serverOnly: true,
    run: (client, msg, args) => {
        var user = msg.mentions.users.first();
        if (!msg.member.hasPermission("KICK_MEMBERS")) { return msg.channel.send(config.replySet.noPermsBot) };
        if (msg.member.highestRole.position <= member.highestRole.position) { return msg.channel.send(config.replySet.noPermsUser) };
        if (!args[0]) { return msg.channel.send('\u26A0 \u276f  Specify a user to warn.') };

        if (args[1] !== undefined) {
            if (args[1].toLowerCase() == '-get') { 
                const embed = new Discord.RichEmbed()
                    .setAuthor(`${user.tag}`, user.displayAvatarURL)
                    .setDescription(`\u1F4A1 \u276f  **Warnings:** ${(!list[msg.guild.id]) ? '0' : list[msg.guild.id][user.id] }`)
                    .setTimestamp(new Date())
                    .setColor([255, 221, 8]);
                msg.channel.send({embed});
                return;
            };
            if (args[1].toLowerCase() == '-clear') { list[msg.guild.id][user.id] = 0; msg.channel.send(`${msg.guild.member(user).displayName}'s warnings have been cleared.`); SaveFile(); return };
        }
        if (!list[msg.guild.id]) {list[msg.guild.id] = {};}
        if (!list[msg.guild.id][user.id]) {list[msg.guild.id][user.id] = 0;}
        list[msg.guild.id][user.id]++;

        msg.channel.send(`\uD83D\uDCE3 \u276f  ${user.toString()} You have been warned!`)
        util.SaveFile('./data/warn.json', list);
    }
}
