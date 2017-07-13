const Discord = require('discord.js'),
      config  = require('../utils/utils.js'),
      stripIndent	= require('common-tags').stripIndent,
      mal     = require('mal-scraper');

module.exports = {
    help: 'Search and get anime information through MyAnimeList.',
    usage: '<search term>',
    run: (client, msg, args) => {
        var term = args.join();
        var r = [];
        if(!Boolean(term)) { return msg.channel.send('\u26A0 \u276f  Specify an anime term to search.') };
        msg.channel.startTyping();
        mal.getResultsFromSearch(term).then(items => {
            var a = items.filter(i => {return i.type == 'anime';});
            a.forEach(i => {
                r.push(`${items.indexOf(i) + 1}. ${i.name}`);
            });
            const embed = new Discord.RichEmbed()
                .setTitle(`Anime Search (${msg.member.displayName})`)
                .setDescription(r.join('\n'))
                .setFooter('Select a number. This ends after 10 seconds. Type "cancel" to abort.')
                .setColor([255, 221, 8]);
            msg.channel.send({embed});
            msg.channel.awaitMessages(m => m.author.id == msg.author.id, {max: 1, time: 10000, errors: ['time']})
                .then(r => {
                    r.first().delete();
                    msg.guild.me.lastMessage.delete();
                    msg.author.lastMessage.delete();
                    if (r.first().content.toLowerCase() == "cancel") {return;};
                    var a = items[r.first().content - 1];
                    mal.getInfoFromURI(a).then(anime => {
                        const info = new Discord.RichEmbed()
                            .setAuthor(anime.name, '', anime.url)
                            .setDescription(anime.synopsis)
                            .setThumbnail(anime.image_url)
                            .addField('Information', stripIndent`
                            \u2022 Type: ${anime.payload.media_type}
                            \u2022 Status: ${anime.payload.status}
                            \u2022 Score: ${anime.payload.score}
                            `, true)
                            .addField('\u200b', stripIndent`
                            \u2022 Year: ${anime.payload.start_year}
                            \u2022 Aired: ${anime.payload.aired}
                            `, true)
                            .setColor([255, 221, 8]);
                        msg.channel.send({embed: info});
                        msg.channel.stopTyping();
                    })
                    .catch(err => {
                        msg.channel.send(config.replySet.error);
                        console.log(err.stack);
                        msg.channel.stopTyping();
                    })
                })
                .catch(err => {
                    msg.guild.me.lastMessage.delete();
                    msg.channel.send('\u26A0 \u276f  Reply took too long.');
                    msg.channel.stopTyping();
                })
        })
        .catch(err => {
            msg.channel.send(config.replySet.error);
            console.log(err.stack);
        });
    }
}