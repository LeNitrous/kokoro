const Discord = require('discord.js'),
      Loot    = require('loot-table'),
      request = require('superagent'),
      Constants = require('../../utils/node-sif/Constants.js');

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

// yeah I'm not going to send a request 11 times for this.
// someone's going to kill me if so
// unless i find an alternative way which is safer

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
                            .setAuthor(`(${card.rarity}) ${card.idol.name}`, Constants[card.attribute].icon)
                            .setFooter('Scouting Results')
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
            for (var i = 0; i < 11; i++) {
                get.push(envelope.choose())
            }
            console.log(get);
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
                        list.push(`#${card.id} **${card.rarity}** ${card.attribute} ${card.idol.name}`)
                        if (completed_requests++ == get.length -1) {
                            const show = new Discord.RichEmbed()
                                .setTitle('Scouting Results')
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