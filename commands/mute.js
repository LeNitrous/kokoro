const fs 		= require('fs'),
      util      = require('../utils/utils.js'),
      config    = require('../config.json'),
      list      = require('../data/mute.json');

module.exports = {
    help: 'Toggle mute status of the user\'s text chat or voice chat.',
    usage: '<User> "Voice"',
    serverOnly: true,
    run: (client, msg, args) => {
        var user      = msg.mentions.users.first();
        var isVoice   = args[1];
        if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) {msg.channel.send(config.replySet.noPermsBot); return};
        if (!msg.member.hasPermission("MANAGE_CHANNELS")) {msg.channel.send(config.replySet.noPermsUser); return};
        if (user === undefined) {msg.channel.send('Specify a user to mute.'); return}
        if (user.id == msg.client.user.id) {msg.channel.send('You can\'t mute me!'); return};
        if (!list[msg.guild.id]) {list[msg.guild.id] = [];}
        if (!list[msg.guild.id].includes(user.id)) {list[msg.guild.id].push(user.id);}
        else {
            var tar = list[msg.guild.id].indexOf(user.id);
            if (tar > -1) {list[msg.guild.id].splice(tar, 1);};
        };
        if (isVoice != 'voice') {
            if (!list[msg.guild.id].includes(user.id)) {
                msg.guild.channels.forEach(c => {
                    c.overwritePermissions(user, {'SEND_MESSAGES': true});
                })
                msg.channel.send(`Unmuted ${msg.mentions.members.first().displayName.`);
                util.SaveFile('./data/mute.json', list);
            } else {
                msg.guild.channels.forEach(c => {
                    c.overwritePermissions(user, {'SEND_MESSAGES': false});
                })
                msg.channel.send(`Muted ${msg.mentions.members.first().displayName.`);
                util.SaveFile('./data/mute.json', list);
            }
        } else {
            if (!msg.guild.me.hasPermission("MUTE_MEMBERS")) {msg.channel.send(config.replySet.noPermsBot); return};
            if (msg.member.serverMute) {
                msg.member.setMute(false)
                msg.channel.send(`Unsilenced ${msg.mentions.members.first().displayName}.`);
            } else {
                msg.member.setMute(true)
                msg.channel.send(`Silenced ${msg.mentions.members.first().displayName}.`);
            }
        }
    }
}