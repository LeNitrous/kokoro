const Discord = require('discord.js'),
      Loot    = require('loot-table'),
      request = require('superagent'),
      reqBuff = require('request').defaults({encoding: null});
      fs      = require('fs'),
      Constants = require('../../utils/node-sif/Constants.js');

var Canvas = require('canvas'),
    Image  = Canvas.Image,
    canvas = new Canvas(960, 640),
    ctx    = canvas.getContext('2d');

var validBoxGroups = {
    "u's": 1,
    "aqours": 1,
//  "both": 1               // Disabled due to superagent bug
};

var validScoutTypes = {
    'honor': 1,
    'honor10': 1,
    'ticket': 1,
};

module.exports = {
    help: 'School idol festival Scouting Boxes!',
    usage: '<Box> <Type>\nBoxes can be: "u\'s", "aqours", "both"\nTypes can be: "honor", "honor10", "ticket"',
    run: (client, msg, args) => {

        var box     = args[0].toLowerCase();
        var type    = args[1].toLowerCase();

        if (!validBoxGroups[box]) {return msg.channel.send('Invalid Box Group.')};
        if (!validScoutTypes[type]) {return msg.channel.send('Invalid Scout Type.')};

        msg.channel.startTyping();

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
        query.is_promo = false;
        query.is_special = false;
        query.ordering = "random";
        if (box != 'both') {query.idol_main_unit = box == 'u\'s' ? '\u03BC\'s' : box};
        if (box == 'both') {query.idol_main_unit = '\u03BC\'s,Aqours'};
            query.rarity = envelope.choose();
            request.get('http://schoolido.lu/api/cards/')
                .query(query)
                .end((error, item) => {
                    if (!error && item.status === 200) {
                        var buff = 'http:' + item.body.results[0].card_image;
                        msg.channel.send('', {files: [{attachment: buff, name: 'sif_scout.jpg'}]})
                    }
                    else
                        msg.channel.send('There was a problem getting the cards.');
                msg.channel.stopTyping();
            });
        }
        else if (type == 'honor10') {
            var get = [];
            var list = [];
            var buffList = [];
            var completed_requests = 0;
            var completed_requests_2 = 0;
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
                req.query('is_promo=false');
                req.query('is_special=false');
                req.query(query);
                req.end((error, item) => {
                    if(!error && item.status === 200) {
                        var card = item.body.results[0];
                        list.push('http:' + item.body.results[0].round_card_image);
                        if (completed_requests++ == get.length -1) {
                            list.forEach(a => {
                                reqBuff.get(a, (err, res, body) => {
                                    buffList.push(body);
                                    if (completed_requests_2++ == get.length -1) {
                                        var c_bg  = new Image;
                                        var c_List = [];
                                        fs.readFile('./data/sif/scout-10.png', (err, bg) => {
                                            c_bg.onload = () => {
                                                console.log('loaded');
                                            };
                                            c_bg.src = bg;
                                            ctx.drawImage(c_bg, 0, 0, 960, 640);
                                            ctx.font = 'normal 18px MotoyaLMaru';
                                            ctx.fillStyle = '#AFAFAF'
                                            ctx.fillText(`Scouted by ${msg.author.username}`, 50, 510);
                                            buffList.forEach((c, i) => {
                                                c_List[i] = new Image;
                                            });
                                            c_List.forEach((c, i) => {
                                                c.src = buffList[i];
                                            });
                                            for (var o = 0; o <= 5; o++) {
                                                ctx.drawImage(c_List[o], 65 + (140 * o), 100);
                                            }
                                            for (var o = 6; o <= 10; o++) {
                                                ctx.drawImage(c_List[o], 155 + (140 * (o - 6)), 300);
                                            }
                                            msg.channel.send('', {files: [{attachment: canvas.toBuffer(), name: 'scout_scout10.jpg'}]});
                                            ctx.clearRect(0, 0, canvas.width, canvas.height)
                                        });
                                    };
                                });
                            });
                        };
                    }
                    else
                        console.log('Error.');
                    msg.channel.stopTyping();
                });
            });
        };
    }
}