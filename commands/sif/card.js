const   Discord = require('discord.js'),
        Constants = require('../../utils/node-sif/Constants.js'),
        stripIndent	= require('common-tags').stripIndent,
        sif = require('../../utils/node-sif');

// https://discuss.codecademy.com/t/challenge-reverse-words/83796/87
function reverseString(originalString) {

  function reverseStringRecursively(strVar) {
	var posLastSpace = strVar.lastIndexOf(" ");
  	if ( posLastSpace > -1) {
  		return strVar.slice(posLastSpace) + reverseStringRecursively(strVar.substr(0, posLastSpace));
  	} else {
  		return strVar;
  	}	
  }

  return reverseStringRecursively(" " + originalString).trim();
}

module.exports = {
    help: "School idol festival Card Search.",
    usage: "<Term/ID> <Filters>\nFilters are comma separated and can be:\n'r=': Rarity, 'a=': Attribute, 's=': Skill, 'p=': Page",
    run: (client, msg, args) => {
        var term = args.join(' ');
        if (!isNaN(term)) {
            sif.getCardsByID(term)
            .then(card => {
                const info = new Discord.RichEmbed()
                    .setAuthor(`(${card.rarity}) ${reverseString(card.idol.name)}`, Constants[card.attribute].icon, `https://schoolido.lu/cards/${card.id}/`)
                    .setColor(Constants[card.attribute].color);
                    if (card.round_card_idolized_image != null) {info.setThumbnail(`http:${card.round_card_idolized_image}`)};
                    if (card.center_skill != "" && card.skill != "") {
                        if (card.center_skill != null) {info.addField(card.center_skill, card.center_skill_details, true)};
                        if (card.skill != null) {info.addField(card.skill, card.skill_details, true)}
                    }
                    else if (card.skill_details != null) {
                        info.setDescription(card.skill_details);
                    };
                        if (card.hp != 0) {
                        info.addField('Stats', stripIndent`
                        \u2022 HP: ${card.hp}
                        \u2022 Smile: ${card.idolized_maximum_statistics_smile}
                        \u2022 Pure: ${card.idolized_maximum_statistics_pure}
                        \u2022 Cool: ${card.idolized_maximum_statistics_cool}
                        `, true)
                    };
                    if (card.ranking_attribute != null) {
                        info.addField('Ranking', stripIndent`
                        \u2022 **#${card.ranking_attribute}** best ${card.attribute} card
                        \u2022 **#${card.ranking_rarity}** best ${card.rarity} card
                        `, true)
                    };
                    msg.channel.send({embed: info});
            })
            .catch(err => {
                console.log(err.stack);
            });
            return;
        }
        var r = [];
        sif.getCardsFromSearch(term)
        .then(items => {
            items.forEach(i => {
                r.push(`${items.indexOf(i) + 1}. #${i.id} (${i.rarity}) [${i.attribute}] ${reverseString(i.idol.name)}`)
            });
            const list = new Discord.RichEmbed()
                .setTitle(`SIF Card Search (${msg.member.displayName})`)
                .setDescription(r.join('\n'))
                .setFooter('Select a number. This ends after 10 seconds. Type "cancel" to abort.')
                .setColor([255, 125, 255]);
            msg.channel.send({embed: list});
            msg.channel.awaitMessages(m => m.author.id == msg.author.id, {max: 1, time: 10000, errors: ['time']})
                .then(r => {
                    r.first().delete();
                    msg.guild.me.lastMessage.delete();
                    if (r.first().content > items.length + 1) {msg.channel.send('Sent number is too big. Please try again.'); return;}
                    if (r.first().content == "cancel") {return};
                    var card = items[r.first().content -1];
                    const info = new Discord.RichEmbed()
                        .setAuthor(`(${card.rarity}) ${reverseString(card.idol.name)}`, Constants[card.attribute].icon, `https://schoolido.lu/cards/${card.id}/`)
                        .setColor(Constants[card.attribute].color);
                    if (card.round_card_idolized_image != null) {info.setThumbnail(`http:${card.round_card_idolized_image}`)};
                    if (card.center_skill != "" && card.skill != "") {
                        if (card.center_skill != null) {info.addField(card.center_skill, card.center_skill_details, true)};
                        if (card.skill != null) {info.addField(card.skill, card.skill_details, true)}
                    }
                    else if (card.skill_details != null) {
                        info.setDescription(card.skill_details);
                    };
                        if (card.hp != 0) {
                        info.addField('Stats', stripIndent`
                        \u2022 HP: ${card.hp}
                        \u2022 Smile: ${card.idolized_maximum_statistics_smile}
                        \u2022 Pure: ${card.idolized_maximum_statistics_pure}
                        \u2022 Cool: ${card.idolized_maximum_statistics_cool}
                        `, true)
                    };
                    if (card.ranking_attribute != null) {
                        info.addField('Ranking', stripIndent`
                        \u2022 **#${card.ranking_attribute}** best ${card.attribute} card
                        \u2022 **#${card.ranking_rarity}** best ${card.rarity} card
                        `, true)
                    };
                    msg.channel.send({embed: info});
                })
                .catch(err => {
                    console.log(err.stack);
                    msg.guild.me.lastMessage.delete();
                    msg.channel.send('Reply took too long.');
                });
        })
    }
}