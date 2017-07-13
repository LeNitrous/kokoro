const fs 		= require('fs'),
      util      = require('../utils/utils.js'),
      config    = require('../config.json');

module.exports = {
    help: 'Toggle mute status of the user\'s text chat or voice chat.\nAUse the "-setup" flag to setup roles and permissions.',
    usage: '<user>',
    serverOnly: true,
    run: (client, msg, args) => {
        var member    = msg.mentions.members.first();
        var flags = args.join(" ");
        if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) { return msg.channel.send(config.replySet.noPermsBot) };
        if (!msg.member.hasPermission("MANAGE_CHANNELS")) { return msg.channel.send(config.replySet.noPermsUser) };
        if (!msg.guild.me.hasPermission("MANAGE_ROLES")) { return msg.channel.send(config.replySet.noPermsBot) };
        if (!msg.member.hasPermission("MANAGE_ROLES")) { return msg.channel.send(config.replySet.noPermsUser) };
        if (flags.includes("-setup")) {
            if (msg.guild.roles.exists("name", "Muted")) {
                msg.channel.send('\u26A0 \u276f  The server already has this role.');
                return;
            };
            msg.guild.createRole({
                name: "Muted",
                color: [0, 0, 0]
            }).then(role => {
                msg.guild.channels.forEach(chan => {
                    chan.overwritePermissions(role, {'SEND_MESSAGES': false});
                })
                msg.channel.send('\u1F4A1 \u276f  Created **Muted** role.');
            });
            return;
        };

        if (member.id == client.user.id) { return msg.channel.send('\u26A0 \u276f  You can\'t mute me.') };

        if (!msg.guild.roles.exists("name", "Muted")) {
            msg.channel.send('\u26A0 \u276f  The server has no **Muted** role.');
            return;
        };

        if (Boolean(member) && !member.roles.exists("name", "Muted")) {
            member.addRole(msg.guild.roles.find("name", "Muted"));
            msg.channel.send(`\uD83D\uDD07 \u276f  **${member.user.username}** is now silenced.`);
        }
        else if (Boolean(member) && member.roles.exists("name", "Muted")) {
            member.removeRole(msg.guild.roles.find("name", "Muted"));
            msg.channel.send(`\uD83D\uDD09 \u276f  **${member.user.username}** is now unsilenced.`);
        }
        else {
            msg.channel.send('\u26A0 \u276f  Specify a user to mute.');
            return;
        };
    }
}