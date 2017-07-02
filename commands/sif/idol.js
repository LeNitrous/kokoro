const   Discord = require('discord.js'),
        Constants = require('../../utils/node-sif/Constants.js'),
        stripIndent	= require('common-tags').stripIndent,
        sif = require('../../utils/node-sif');

module.exports = {
    help: 'School idol festival Idol Search.',
    usage: "<Term>, <Filters>\nFilters are comma separated and can be:\n's=': School, 'mu=': Main Unit, 'su=': Sub-Unit, 'p=': Page",
    run: (client, msg, args) => {
        var term = args.join(' ');
        var r = [];
        sif.getIdolsFromSearch(term)
        .then(items => {
            items.forEach(i => {
                r.push(`${items.indexOf(i) + 1}. ${i.name}`)
            });
            const list = new Discord.RichEmbed()
                .setTitle(`SIF Idol Search (${msg.member.displayName})`)
                .setDescription(r.join('\n'))
                .setFooter('Select a number. This ends after 10 seconds. Type "cancel" to abort.')
                .setColor([255, 125, 255]);
            msg.channel.send({embed: list});
            msg.channel.awaitMessages(m => m.author.id == msg.author.id, {max: 1, time: 10000, errors: ['time']})
                .then(r => {
                    r.first().delete();
                    msg.guild.me.lastMessage.delete();
                    if (isNaN(parseInt(r.first().content))) {msg.channel.send('Please provide a valid number.'); return;}
                    if (r.first().content > items.length + 1) {msg.channel.send('Sent number is too big. Please try again.'); return;}
                    if (r.first().content == "cancel") {return};
                    var idol = items[r.first().content - 1];
                    const info = new Discord.RichEmbed()
                        .setAuthor(`${idol.name}`)
                        .setDescription(idol.summary)
                        .addField('Idol Details', stripIndent`
                        \u2022 Age: ${idol.age != null ? idol.age : 'Unknown'}
                        \u2022 Birthday: ${idol.birthday}
                        \u2022 Sign: ${idol.astrological_sign}
                        \u2022 Hobbies: ${idol.hobbies}
                        \u2022 Favorite Food: ${idol.favorite_food}
                        \u2022 Disliked Food: ${idol.least_favorite_food}
                        \u2022 Height: ${idol.height}cm
                        `, true)
                        .addField('\u200b', stripIndent`
                        \u2022 Blood Type: ${idol.blood}
                        \u2022 Measurements: ${idol.measurements}
                        \u2022 School: ${idol.school}
                        \u2022 Year: ${idol.year}
                        \u2022 Main Unit: ${idol.main_unit}
                        \u2022 Sub Unit: ${idol.sub_unit}
                        `, true)
                        .addField('Sources', stripIndent`
                        \u2022 [Official Site](${idol.official_url})
                        \u2022 [schoolido.lu](${idol.website_url})
                        \u2022 [decaf.kouhi.me](${idol.wiki_url})
                        \u2022 [Love Live! Wikia](${idol.wikia_url})
                        `, true)
                        .addField('Seiyuu Details', stripIndent`
                        \u2022 ${idol.cv.name} (${idol.cv.nickname})
                        \u2022 [MyAnimeList](${idol.cv.url})
                        \u2022 [Twitter](https://twitter.com/${idol.cv.twitter})
                        \u2022 [Instagram](https://www.instagram.com/${idol.cv.instagram}/)
                        `, true)
                        .setColor([255, 125, 255]);
                    msg.channel.send({embed: info});
                })
                .catch(err => {
                    console.log(err.stack);
                    msg.guild.me.lastMessage.delete();
                    if (err.name == 'TypeError') {return msg.channel.send('The idol doesn\'t seem to have much information.')};
                    msg.channel.send('Reply took too long.');
                });
        })
    }
}