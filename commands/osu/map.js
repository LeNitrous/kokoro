const Discord = require('discord.js'),
      osuApi  = require('../../utils/node-osu'),
      config  = require('../../config.json'),
      util  = require('../../utils/utils.js'),
      stripIndent   = require('common-tags').stripIndent,
      stripTags     = require('striptags');

var osu = new osuApi.Api(config.osu_token);

var Status = {
    "Graveyard": '',
    "WIP": '\u2754',
    "Pending": '\u2754',
    "Qualified": '\u2705',
    "Ranked": '\u2B06',
    "Approved": '\uD83D\uDD25',
    "Loved": '\u2764'
};

function formatTime(x) {
    var hrs   = Math.floor(x / 3600);
    var rem = x - hrs * 3600;
    var min = Math.floor(rem / 60);
    var sec = rem - min * 60;
    var out = '';
    if (hrs > 0) {
        out += '' + hrs + ':' + (min < 10 ? '0' : '');
    }
    out += '' + min + ':' + (sec < 10 ? '0' : '');
    out += '' + sec;
    return out;
};

// https://stackoverflow.com/questions/1199352/smart-way-to-shorten-long-strings-with-javascript
function truncate( n, useWordBoundary ){
    if (this.length <= n) { return this; }
    var subString = this.substr(0, n-1);
    return (useWordBoundary 
       ? subString.substr(0, subString.lastIndexOf(' ')) 
       : subString) + "...";
};

module.exports = {
    help: 'Gets an osu! beatmap or a beatmap set.',
    usage: '<mapID/link>',
    run: (client, msg, args) => {
        if (args[0] === undefined ) { return msg.channel.send('\u26A0 \u276f  Invalid Arguments.') };
        if (args[0].includes('https://osu.ppy.sh/s/')) {
            var s = args[0].includes('https://osu.ppy.sh/s/') ? args[0].replace('https://osu.ppy.sh/s/', '') : args[0];
            s = s.substring(0, s.indexOf('&') != -1 ? s.indexOf('&') : s.length);
            osu.getBeatmapSet({s: s})
                .then(bms => {
                    // Build Version List Here
                    var diff = [];
                    function sortDiffs (a, b) {
                        if (a.difficulty.rating < b.difficulty.rating) return -1;
                        if (a.difficulty.rating > b.difficulty.rating) return 1;
                        return 0;
                    };
                    bms.difficulty.sort(sortDiffs);
                    bms.difficulty.forEach(v => {
                        diff.push(`\u2022 [${v.version}](https://osu.ppy.sh/b/${v.id}) (${Number(v.difficulty.rating).toFixed(2)}\u2606)`);
                    });
                    //
                    var title = bms.artist + ' - ' + bms.title
                    const embed = new Discord.RichEmbed()
                        .setAuthor(`${Status[bms.approvalStatus]} ${truncate.apply(title, [60, true])}`, ``, `https://osu.ppy.sh/s/${bms.beatmapSetId}`)
                        .setThumbnail(`https://b.ppy.sh/thumb/${bms.beatmapSetId}l.jpg`)
                        .setDescription(`by ${bms.creator}`)
                        .setColor([187, 17, 119])
                        .addField('Song Details', stripIndent`
                        \u2022 Source: ${bms.source}
                        \u2022 Genre: ${bms.genre} (${bms.language})
                        `, true)
                        .addField('Mapset Info', stripIndent`
                        \u2022 BPM: ${bms.bpm}
                        \u2022 Length: ${formatTime(bms.time.total)} (${formatTime(bms.time.drain)} drain)
                        `, true)
                        .addField('Difficulties', diff.join('\n'))
                        .addField('Downloads', stripIndent`
                        \u2022 [Download](https://osu.ppy.sh/d/${bms.beatmapSetId})
                        \u2022 [Download without Video](https://osu.ppy.sh/d/${bms.beatmapSetId}n)
                        \u2022 [Download with osu!direct](osu://dl/${bms.beatmapSetId})
                        `);
                    msg.channel.send({embed});
                })
                .catch(err => {
                    console.log(err.stack);
                    if (err.name == 'RangeError') {msg.channel.send('Cannot parse this beatmap.'); return;};
                    if (err.message == 'Beatmap Set not found') {msg.channel.send('\u26A0 \u276f  Beatmap Set not found.'); return;};
                    msg.channel.send(config.replySet.error);
                });
        }
        else if (args[0].includes('https://osu.ppy.sh/b/')) {
            var b = args[0].includes('https://osu.ppy.sh/b/') ? args[0].replace('https://osu.ppy.sh/b/', '') : args[0];
            b = b.substring(0, b.indexOf('&') != -1 ? b.indexOf('&') : b.length);    
            osu.getBeatmaps({b: b})
                .then(beatmap => {
                    var bm = beatmap[0];
                    var title = bm.artist + ' - ' + bm.title
                    const embed = new Discord.RichEmbed()
                        .setAuthor(`${Status[bm.approvalStatus]} ${truncate.apply(title, [75, true])} [${bm.version}]`, ``, `https://osu.ppy.sh/s/${bm.beatmapSetId}`)
                        .setThumbnail(`https://b.ppy.sh/thumb/${bm.beatmapSetId}l.jpg`)
                        .setDescription(`by ${bm.creator}`)
                        .setColor([187, 17, 119])
                        .addField('Song Details', stripIndent`
                        \u2022 Source: ${bm.source}
                        \u2022 Genre: ${bm.genre} (${bm.language})
                        `)
                        .addField('Map Info', stripIndent`
                        \u2022 BPM: ${bm.bpm}
                        \u2022 Length: ${formatTime(bm.time.total)} (${formatTime(bm.time.drain)} drain)
                        \u2022 Difficulty: ${Number(bm.difficulty.rating).toFixed(2)}\u2606
                        \u2022 CS: ${bm.difficulty.size} OD: ${bm.difficulty.overall} AR: ${bm.difficulty.approach} HP: ${bm.difficulty.drain}
                        `)
                        .addField('Downloads', stripIndent`
                        \u2022 [Download](https://osu.ppy.sh/d/${bm.beatmapSetId})
                        \u2022 [Download without Video](https://osu.ppy.sh/d/${bm.beatmapSetId}n)
                        \u2022 [Download with osu!direct](osu://dl/${bm.beatmapSetId})
                        `);
                    msg.channel.send({embed});
                })   
                .catch(err => {
                    console.log(err.stack);
                    msg.channel.send('\u26A0 \u276f  Beatmap not found.');
                });
        }
        else {
            msg.channel.send('\u26A0 \u276f  Invalid Argument.');
        };
    }
}