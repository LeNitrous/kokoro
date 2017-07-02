const request = require('then-request'),
      Discord = require('discord.js'),
      stripIndent   = require('common-tags').stripIndent,
      Bandori = require('../../utils/node-bandori');

module.exports = {
    help: 'Bandori Member Search.',
    usage: '<Page>',
    run: (client, msg, args) => {
        var term = args.join(' ');
        var r = [];
        Bandori.getMember(term)
        .then(mem => {
            const info = new Discord.RichEmbed()
                .setAuthor(mem.name, mem.square_image, `http://bandori.party/members/${mem.id}`)
                .setDescription(mem.description)
                .setThumbnail(mem.image)
                .addField('Member Details', stripIndent`
                \u2022 Band: ${mem.i_band}
                \u2022 Position: ${mem.hobbies}
                \u2022 School: ${mem.school}
                \u2022 Year: ${mem.i_school_year}
                \u2022 Birthday: ${mem.birthday}
                \u2022 Favorite Food: ${mem.food_likes}
                \u2022 Disliked Food: ${mem.food_dislikes}
                \u2022 Astrological Sign: ${mem.i_astrological_sign}
                `, true)
                .addField('Seiyuu Details', stripIndent`
                \u2022 ${mem.romaji_CV} (${mem.CV})
                `, true)
                .setColor([228, 0, 70]);
            msg.channel.send({embed: info});
        })
        .catch(err => {
            console.log(err);
        });
/*
        Bandori.getMembers(term)
        .then(items => {
            items.forEach(i => {
                r.push(`${items.indexOf(i) + 1}. ${i.name}`)
            });
            const list = new Discord.RichEmbed()
                .setTitle(`Bandori Member Search (${msg.member.displayName})`)
                .setDescription(r.join('\n'))
                .setFooter('Select a number. This ends after 10 seconds. Type "cancel" to abort.')
                .setColor([228, 0, 70]);
            msg.channel.send({embed: list});
            msg.channel.awaitMessages(m => m.author.id == msg.author.id, {max: 1, time: 10000, errors: ['time']})
                .then(r => {
                    r.first().delete();
                    msg.guild.me.lastMessage.delete();
                    if (isNaN(parseInt(r.first().content))) {msg.channel.send('Please provide a valid number.'); return;}
                    if (r.first().content > items.length + 1) {msg.channel.send('Sent number is too big. Please try again.'); return;}
                    if (r.first().content == "cancel") {return};
                    var mem = items[r.first().content - 1];
                    const info = new Discord.RichEmbed()
                        .setAuthor(mem.name, mem.square_image, `http://bandori.party/members/${mem.id}`)
                        .setDescription(mem.description)
                        .setThumbnail(mem.image)
                        .addField('Member Details', stripIndent`
                        \u2022 Band: ${mem.i_band}
                        \u2022 Position: ${mem.hobbies}
                        \u2022 School: ${mem.school}
                        \u2022 Year: ${mem.i_school_year}
                        \u2022 Birthday: ${mem.birthday}
                        \u2022 Favorite Food: ${mem.food_likes}
                        \u2022 Disliked Food: ${mem.food_dislikes}
                        \u2022 Astrological Sign: ${mem.i_astrological_sign}
                        `, true)
                        .addField('Seiyuu Details', stripIndent`
                        \u2022 ${mem.romaji_CV} (${mem.CV})
                        `, true)
                        .setColor([228, 0, 70]);
                    msg.channel.send({embed: info});
                })
                .catch(err => {
                    console.log(err.stack);
                    msg.guild.me.lastMessage.delete();
                    if (err.name == 'TypeError') {return msg.channel.send('The idol doesn\'t seem to have much information.')};
                    msg.channel.send('Reply took too long.');
                });
        })
*/
    }
}