const fs 		= require('fs'),
      osuApi    = require('../../utils/node-osu'),
      util      = require('../../utils/utils.js'),
      list      = require('../../data/osu_link.json'),
      config    = require('../../config.json');

var osu = new osuApi.Api(config.osu_token);

module.exports = {
    help: 'Link Discord to an osu! account. Leave <user> blank to clear',
    usage: '<mention> <osu user>',
    serverOnly: true,
    run: (client, msg, args) => {
        var m = msg.mentions.users.first();
        var u = args[1];
        console.log(args[1])
        if (args[1] === undefined) {
            if (!list[msg.guild.id]) { return };
            if (!list[msg.guild.id][m.id]) { return };
            delete list[msg.guild.id][m.id].osu;
            util.SaveFile('./data/link.json', list);
            msg.channel.send(`\uD83D\uDD17 \u276f  ${msg.guild.member(m).displayName} is now unlinked.`);
            return;
        }
        osu.getUser({u: u})
            .then(user => {
                if (!list[msg.guild.id]) { list[msg.guild.id] = {} };
                if (!list[msg.guild.id][m.id]) { list[msg.guild.id][m.id] = {} };
                if (("osu" in list[msg.guild.id][m.id])) { return msg.channel.send('\u26A0 \u276f  This user is already linked to an osu! user.') };
                list[msg.guild.id][m.id].osu = user.id;
                msg.channel.send(`\uD83D\uDD17 \u276f  ${msg.guild.member(m).displayName} is now linked to **${user.name}**.`);
                util.SaveFile('./data/link.json', list);
            })
            .catch(err => {
                console.log(err.stack);
                if (err.message == 'User not found') { return msg.channel.send('\u26A0 \u276f  User not found.') };
                msg.channel.send(config.replySet.error);
            })
    }
}