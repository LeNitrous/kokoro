const Discord = require('discord.js'),
      Loot    = require('loot-table'),
      request = require('superagent'),
      Constants = require('../../utils/node-sif/Constants.js');

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

var validBoxGroups = {
    "u's": 1,
    "aqours": 1,
    "both": 1
}

var validScoutTypes = {
    'honor': 1,
    'honor10': 1,
    'ticket': 1,
};

module.exports = {
    help: 'School idol festival Scouting Boxes!',
    usage: '<Box> <Type>\nBoxes can be: "u\'s", "aqours", "both"\nTypes can be: "honor", "honor10", "ticket"',
    run: (client, msg, args) => {
        if (!validBoxGroups[args[0]]) {return msg.channel.send('Invalid Box Group.')};
        if (!validScoutTypes[args[1]]) {return msg.channel.send('Invalid Scout Type.')};

        var box     = args[0].toLowerCase();
        var type    = args[1].toLowerCase();

        var envelope = new Loot();
        if (type == 'honor' || type == 'honor10') {
            envelope.add('UR', 1);
            envelope.add('SSR', 4);
            envelope.add('SR', 15);
            envelope.add('R', 80);
        }
        else if (type == 'ticket') {
            envelope.add('UR', 20);
            envelope.add('SR', 80);
        }

        var query = {};

        if (type != 'honor10') {
        query.page_size = 1;
        query.ordering = "random";
        if (box != 'both') {query.idol_main_unit = box == 'u\'s' ? '\u03BC\'s' : box};
        if (box == 'both') {query.idol_main_unit = '\u03BC\'s,Aqours'};
            query.rarity = envelope.choose();
            request.get('http://schoolido.lu/api/cards/')
                .query(query)
                .end((error, item) => {
                    if (!error && item.status === 200) {
                        var card = item.body.results[0];
                        const show = new Discord.RichEmbed()
                            .setAuthor(`(${card.rarity}) ${reverseString(card.idol.name)}`, Constants[card.attribute].icon)
                            .setFooter(`${msg.member.displayName}'s scouting result.`)
                            .setColor(Constants[card.attribute].color);
                        if (card.card_image != null) {show.setImage(`http:${card.card_image}`)}
                        msg.channel.send({embed: show});
                    }
                    else
                        msg.channel.send('There was a problem getting the cards.');
            });
        }
        else if (type == 'honor10') {
            var get = [];
            var list = [];
            var completed_requests = 0;
            for (var i = 0; i < 10; i++) {
                get.push(envelope.choose())
            }
            get.push('SR');
            get.forEach(i => {
                var req = request.get('http://schoolido.lu/api/cards/');
                query.page_size = 1;
                query.ordering = "random";
                query.rarity = i;
                if (box != 'both') {query.idol_main_unit = box == 'u\'s' ? '\u03BC\'s' : box};
                if (box == 'both') {query.idol_main_unit = '\u03BC\'s,Aqours'};
                req.query(query);
                req.end((error, item) => {
                    if(!error && item.status === 200) {
                        var card = item.body.results[0];
                        list.push(`**${card.rarity}** ${card.attribute} ${reverseString(card.idol.name)} (#${card.id})`)
                        if (completed_requests++ == get.length -1) {
                            const show = new Discord.RichEmbed()
                                .setTitle(`${msg.member.displayName} scouted:`)
                                .setDescription(list.join('\n'))
                                .setColor([255, 125, 255]);
                            msg.channel.send({embed: show});
                        };
                    }
                    else
                        console.log('Error.');
                });
            });
        };
    }
}