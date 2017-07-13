const Discord = require('discord.js'),
      stripIndent   = require('common-tags').stripIndent,
      Constants = require('../../utils/node-ss/Constants.js'),
      Deresute = require('../../utils/node-ss');

module.exports = {
    help: 'Starlight Stage Cards.',
    usage: '<id>',
    run: (client, msg, args) => {
        var id = args[0];
        Deresute.getCard(id)
        .then(card => {
            var res = card.result[0];
            const info = new Discord.RichEmbed()
                .setAuthor(`[${res.title}] ${res.chara.conventional}`, Constants.Attributes[res.attribute].icon)
                .setURL(`https://starlight.kirara.ca/card/${id}`)
                .setThumbnail(res.icon_image_ref)
                .addField('Skill Type', res.skill.skill_type, true)
                .addField('Vo/Vi/Da', `${res.vocal_max} / ${res.visual_max} / ${res.dance_max}`, true)
                .addField(`Skill: ${res.skill.skill_name}`, res.skill.explain_en)
                .addField(`Leader Skill: ${res.lead_skill.name}`, res.lead_skill.explain_en)
                .setColor(Constants.Attributes[res.attribute].color);
            msg.channel.send({embed: info});
        })
        .catch(err => {
            console.log(err.stack);
            msg.channel.send('\u26A0 \u276f  Card not found.');
        });
    }
}