const   Discord = require('discord.js'),
        Constants = require('../../utils/node-sif/Constants.js'),
        stripIndent	= require('common-tags').stripIndent,
        sif = require('../../utils/node-sif');

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

module.exports = {
    help: "School idol festival Song Search.",
    usage: "<term>, <filters>\nFilters are comma separated and can be:\n'a=': Attribute, 'p=': Page",
    run: (client, msg, args) => {
        var term = args.join(' ');
        var r = [];
        sif.getSongsFromSearch(term)
        .then(items => {
            items.forEach(i => {
                r.push(`${items.indexOf(i) + 1}. ${i.romaji_name != null ? i.romaji_name : i.name }`);
            });
            const list = new Discord.RichEmbed()
                .setTitle(`SIF Song Search (${msg.member.displayName})`)
                .setDescription(r.join('\n'))
                .setFooter('Select a number. This ends after 10 seconds. Type "cancel" to abort.')
                .setColor([255, 125, 255]);
            msg.channel.send({embed: list});
            msg.channel.awaitMessages(m => m.author.id == msg.author.id, {max: 1, time: 10000, errors: ['time']})
                .then(r => {
                    r.first().delete();
                    msg.guild.me.lastMessage.delete();
                    if (r.first().content > items.length + 1) {msg.channel.send('\u26A0 \u276f  Sent number is too big. Please try again.'); return;}
                    if (r.first().content == "cancel") {return};
                    var song = items[r.first().content -1];
                    var diffs = stripIndent`
                    \u2022 Easy (${song.easy_difficulty}\u2606, ${song.easy_notes} notes)
                    \u2022 Normal (${song.normal_difficulty}\u2606, ${song.normal_notes} notes)
                    \u2022 Hard (${song.hard_difficulty}\u2606, ${song.hard_notes} notes)
                    \u2022 Expert (${song.expert_difficulty}\u2606, ${song.expert_notes} notes)                   
                    `;
                    if (song.master_difficulty != null) {
                        var m = `\n\u2022 Master (${song.master_difficulty}\u2606, ${song.master_notes} notes)`
                        diffs = diffs.concat(m);
                    };
                    var songInfo = stripIndent`
                    \u2022 BPM: ${song.BPM}
                    \u2022 Time: ${formatTime(song.time)}
                    `;
                    if (song.romaji_name != null) {
                        var r = `\n\u2022 ${song.romaji_name}`
                        songInfo = songInfo.concat(r);
                    };
                    const info = new Discord.RichEmbed()
                        .setAuthor(song.name, Constants[song.attribute].icon, song.website_url)
                        .setThumbnail(`http:${song.image}`)
                        .setDescription(songInfo)
                        .addField('Difficulties', diffs)
                        .setColor(Constants[song.attribute].color);
                    msg.channel.send({embed: info});
                })
                .catch(err => {
                    console.log(err.stack);
                    msg.guild.me.lastMessage.delete();
                    msg.channel.send('\u26A0 \u276f  Reply took too long.');                    
                })
        })
    }
}