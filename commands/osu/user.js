const Discord = require('discord.js'),
      osuApi  = require('../../utils/node-osu'),
      list    = require('../../data/link.json'),
      config  = require('../../config.json'),
      stripIndent   = require('common-tags').stripIndent,
      stripTags     = require('striptags');

var osu = new osuApi.Api(config.osu_token);

var Modes = {
    0: 'osu!',
    1: 'osu!taiko',
    2: 'osu!catch',
    3: 'osu!mania'
};

var ModesArg = {
    'standard': 0,
    'osu': 0,
    'std': 0,  
    'taiko': 1,
    'catch': 2,
    'ctb': 2,
    'mania': 3,
};

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = {
    help: 'Gets an osu! user profile',
    usage: '<mention/user> <mode>',
    run: (client, msg, args) => {
        /*
        var input = args.join(" ").split(",");
        var u = input[0] != '' ? input[0] : msg.author;
        var m = input[1] != undefined ? input[1].trim() : 0;
        if ((u.match(/<@[\d]+>/g) || u.match(/<@![\d]+>/g)) && u != '') { u = msg.mentions.users.first() };
        console.log(`user: ${u}, mode: ${m}`)
        */
        if (args.slice(-1)[0] in ModesArg){ var m = ModesArg[args.pop()] } else { var m = 0 };
        var u = args.join(" ");
        var f;
        if (u === undefined) { u = msg.author }
        else if (u.match(/<@[\d]+>/g) || u.match(/<@![\d]+>/g)) { u = msg.mentions.users.first() };
        if (typeof u == 'object') { 
            f = msg.mentions.users.first()
            if (list[msg.guild.id] && list[msg.guild.id][u.id] && list[msg.guild.id][u.id].osu) {
                u = list[msg.guild.id][u.id].osu;
            }
            else {
                u = undefined;
            }
        };
        if (u == undefined) { return msg.channel.send(`\u26A0 \u276f  ${f.username} doesn't have a linked osu! account yet.`) };
        osu.getUser({u: u, m: m})
            .then(user => {
                const embed = new Discord.RichEmbed()
                    .setAuthor(`${user.name}`, `https://osu.ppy.sh/images/flags/${user.country}.png`, `https://osu.ppy.sh/users/${user.id}`)
                    .setThumbnail(`https://a.ppy.sh/${user.id}`)
                    .setDescription(stripIndent`
                        \u2022 ${formatNumber(Math.floor(user.pp.raw))}pp
                        \u2022 Hit Accuracy: ${user.accuracyFormatted}
                        \u2022 Ranking: #${user.pp.rank} (#${user.pp.countryRank})
                    `)
                    .setColor([187, 17, 119])
                    .setFooter(Modes[m]);
                msg.channel.send({embed});
            })
            .catch(err => {
                console.log(err.stack);
                if (err.message == 'User not found') {msg.channel.send('\u26A0 \u276f  User not found.'); return;};
                msg.channel.send(config.replySet.error);
            })
    }
}
