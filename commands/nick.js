const fs 		= require('fs'),
      util      = require('../utils/utils.js');
      config    = require('../config.json');

module.exports = {
    help: 'Set your or someone else\'s server nickname. Leave blank to clear it.',
    usage: '<User> "Nick"',
    serverOnly: true,
    run: (client, msg, args) => {
        var user      = msg.mentions.users.first();
        if (!msg.guild.me.hasPermission("MANAGE_NICKNAMES")) {msg.channel.send(config.replySet.noPermsBot); return;};
        if (!msg.member.hasPermission("MANAGE_NICKNAMES")) {msg.channel.send(config.replySet.noPermsUser); return;};
        if (args[0] === undefined) {util.sendcmdhelp(msg, 'nick', config.prefix, module.exports.help, module.exports.usage); return;};
        args.shift();
        var nick = args.join(" ");
        if (user.id == client.user.id && !msg.guild.me.hasPermission("CHANGE_NICKNAME")) {msg.channel.send(config.replySet.noPermsBot); return;};
        if (nick === undefined) {nick = "";};
        msg.member.setNickname(nick);
    }
}