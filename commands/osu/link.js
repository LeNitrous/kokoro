const fs 		= require('fs'),
      osuApi    = require('../../utils/node-osu'),
      util      = require('../../utils/utils.js'),
      list      = require('../../data/osu_link.json'),
      config    = require('../../config.json');

var osu = new osuApi.Api(config.osu_token);

module.exports = {
    help: 'Link a Discord Member to an osu! account. Leave <User> blank to clear',
    usage: '<Mention> <User>',
    serverOnly: true,
    run: (client, msg, args) => {
        var m = msg.mentions.users.first();
        var u = args[1];
        console.log(args[1])
        if (args[1] === undefined) {
            if (!list[msg.guild.id]) {return;};
            if (!list[msg.guild.id][m.id]) {return;};
            delete list[msg.guild.id][m.id];
            util.SaveFile('./data/osu_link.json', list);
            msg.channel.send(`\u274C \u276f  ${msg.guild.member(m).displayName} is now unlinked.`);
            return;
        }
        osu.getUser({u: u})
            .then(user => {
                if (!list[msg.guild.id]) {list[msg.guild.id] = {};};
                if (!list[msg.guild.id[m.id]]) {list[msg.guild.id][m.id] = user.id};
                msg.channel.send(`\u1F517 \u276f  ${msg.guild.member(m).displayName} is now linked to **${user.name}**.`);
                util.SaveFile('./data/osu_link.json', list);
            })
            .catch(err => {
                console.log(err.stack);
                if (err.message == 'User not found') {msg.channel.send('User not found.'); return;};
                msg.channel.send(config.replySet.error);
            })
    }
}