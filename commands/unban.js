const config    = require('../config.json'),
      Discord	= require('discord.js'),
      stripIndent   = require('common-tags').stripIndent;

module.exports = {
    help: 'Revokes a ban from a user.',
    usage: '<mention>',
    ownerOnly: true,
    serverOnly: true,
    run: (client, msg, args) => {
        var user      = args.join(' ');
        if (!msg.guild.me.hasPermission("BAN_MEMBERS")) { return msg.channel.send(config.replySet.noPermsBot) };
        if (!msg.member.hasPermission("BAN_MEMBERS")) { return msg.channel.send(config.replySet.noPermsUser) };
        if (user === undefined) { return msg.channel.send('\u26A0 \u276f  Specify a user to unban.') };
        msg.guild.fetchBans()
            .then(u => {
                var target = u.findKey('username', user);
                msg.guild.unban(target);
                msg.channel.send(`\u1F4A1 \u276f  Unbanned **${target.username}**.`)
                    .then(m=> m.delete(3000)
                    .catch(err => console.log(err)), err => console.log(err));
                var eventLogChannel = require('../data/guildSettings.json')[member.guild.id].guildEventLogChannel;
                if (!eventLogChannel) return;
                const log = new Discord.RichEmbed()
                    .setAuthor(msg.author.tag, msg.author.displayAvatarURL)
                    .setDescription(stripIndent`
                    \u2022 **Member:** ${target.username}
                    `)
                    .setTimestamp(new Date())
                    .setFooter('User Unbanned');
                msg.guild.channels.find('id', eventLogChannel).send({embed: log});
            }, err => {
                msg.channel.send(`\u1F6AB \u276f  Cannot revoke ban on **${user}**.`)
            });
    }
}