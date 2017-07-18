const config    = require('../config.json'),
      Discord	= require('discord.js'),
      stripIndent   = require('common-tags').stripIndent;

module.exports = {
    help: 'Kick a user off your guild.',
    usage: '<mention> <reason>',
    serverOnly: true,
    run: (client, msg, args) => {
        var member = msg.mentions.members.first();
        args.shift();
        var text = args.join(" ");
        if (!msg.guild.me.hasPermission("KICK_MEMBERS")) { return msg.channel.send(config.replySet.noPermsBot) };
        if (!msg.member.hasPermission("KICK_MEMBERS")) { return msg.channel.send(config.replySet.noPermsUser) };
        if (msg.member.highestRole.position <= member.highestRole.position) { return msg.channel.send(config.replySet.noPermsUser) };
        if (member === undefined) { return msg.channel.send('\u26A0 \u276f  Specify a user to kick.') };
        if (text.length <= 0) {text = 'No reason specificed.'};
        if (member == msg.author.id) { return msg.channel.send(`\u26A0 \u276f  You can't kick yourself!`) };
        if (member.kickable) {
            member.user.send(`You have been kicked off from **${msg.guild.name}** by **${msg.author.username}**.\n\n**Reason:** ${text}`)
               .catch(console.error);
            msg.channel.send(`:boot: \u276f  Kicked **${member.user.username}**..\n\n**Reason:** ${text}`);
            member.kick({reason: text});
            var eventLogChannel = require('../data/guildSettings.json')[member.guild.id].guildEventLogChannel;
            if (!eventLogChannel) return;
            const log = new Discord.RichEmbed()
                .setAuthor(msg.author.tag, msg.author.displayAvatarURL)
                .setColor([244, 178, 65])
                .setDescription(stripIndent`
                \u2022 **Member:** ${member.user.tag}
                \u2022 **Reason:** ${text}
                `)
                .setTimestamp(new Date())
                .setFooter('User Kicked');
            msg.guild.channels.find('id', eventLogChannel).send({embed: log});
        }
        else {
            msg.channel.send(`\u26A0 \u276f  **${member.user.username}** can't be kicked.`);
        };
    }
}