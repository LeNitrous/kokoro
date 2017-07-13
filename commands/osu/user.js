const Discord = require('discord.js'),
      osuApi  = require('../../utils/node-osu'),
      list    = require('../../data/osu_link.json'),
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
    'o': 0,
    's': 0,  
    'taiko': 1,
    't': 1,
    'catch': 2,
    'ctb': 2,
    'c': 2,
    'mania': 3,
    'm': 3,
    0: 0,
    1: 1,
    2: 2,
    3: 3
};

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = {
    help: 'Gets an osu! user profile',
    usage: '<user> <osu/taiko/catch/mania>',
    run: (client, msg, args) => {
        var m = ModesArg[args[1].toLowerCase()] || '0';
        var u = !args[0].startsWith('<@') ? args[0] : msg.mentions.users.first();
        if (typeof u == 'object') {
            u = list[msg.guild.id][u.id].osu;
        };
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