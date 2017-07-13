const Discord = require('discord.js'),
      stripIndent   = require('common-tags').stripIndent,
      Constants = require('../../utils/node-bandori/Constants.js'),
      Bandori = require('../../utils/node-bandori');

module.exports = {
    help: 'Bandori Cards.',
    usage: '<id>',
    run: (client, msg, args) => {
        var id= args[0];
        Bandori.getCard(id)
        .then(card => {
            var thumb = card.image_trained != null ? card.image_trained : card.image;
            var power = card.performance_trained_max + card.technique_trained_max + card.visual_trained_max != 0 ? card.performance_trained_max + card.technique_trained_max + card.visual_trained_max : card.performance_max + card.technique_max + card.visual_max;
            var title = card.name != null ? card.name : card.japanese_name;
            var skill_title = card.skill_name != null ? card.skill_name : card.japanese_skill_name;
            const info = new Discord.RichEmbed()
                .setAuthor(`[${title}] ${Constants.Members[card.member]}`, Constants.Attributes[card.i_attribute].icon)
                .setURL(`http://bandori.party/cards/${card.id}`)
                .setThumbnail(thumb)
                .addField('Skill Type', card.i_skill_type, true)
                .addField('Max Power', power, true)
                .addField(skill_title, card.skill_details)
                .setColor(Constants.Attributes[card.i_attribute].color);
            msg.channel.send({embed: info});
        })
        .catch(err => {
            console.log(err.stack);
            msg.channel.send('\u26A0 \u276f  Card not found.');
        });
    }
}