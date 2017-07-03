const request = require('then-request'),
      Discord = require('discord.js'),
      stripIndent   = require('common-tags').stripIndent,
      Constants = require('../../utils/node-bandori/Constants.js'),
      Bandori = require('../../utils/node-bandori');

module.exports = {
    help: 'Bandori Card Search.',
    usage: '',
    run: (client, msg, args) => {
        var term = args.join(' ');
        var r = [];
        Bandori.getCard(term)
        .then(card => {
            const info = new Discord.RichEmbed()
                .setTitle(`[${card.name}] ${Constants.Members[card.member]}`)
                .setURL(`http://bandori.party/cards/${card.id}`)
                .setThumbnail(card.image_trained)
                .addField('Skill Type', card.i_skill_type, true)
                .addField('Max Power', card.performance_trained_max + card.technique_trained_max + card.visual_trained_max, true)
                .addField(card.skill_name, card.skill_details)
                .setColor([228, 0, 70]);
            msg.channel.send({embed: info});
        })
        .catch(err => {
            console.log(err.stack);
        });
        /*
        Bandori.getCardsFromSearch(term)
        .then(items => {
            items.forEach(i => {
                r.push(`${items.indexOf(i) + 1}. ${i.i_rarity}\u2606 [${i.i_attribute}] ${Constants.Members[i.member]}`)
            })
            const list = new Discord.RichEmbed()
                .setTitle(`Bandori Card Search (${msg.member.displayName})`)
                .setDescription(r.join('\n'))
                .setFooter('Select a number. This ends after 10 seconds. Type "cancel" to abort.')
                .setColor([228, 0, 70]);
            msg.channel.send({embed: list});
        })
        .catch(err => {
            console.log(err.stack);
            if (err.message == 'Invalid Member Name')
                msg.channel.send('Invalid member name.');
        })
        */
    }
}