const config = require('../config.json');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var dict = {
    me: "you",
    Me: "you",
    my: "your",
    My: "your"
}

function replaceAll(str,array){
    var re = new RegExp(Object.keys(array).join("|"),"gi");

    return str.replace(re, function(matched){
        return array[matched.toLowerCase()];
    });
}

module.exports = {
    help: 'Rates something.',
    usage: '<question>',
    ownerOnly: false,
    serverOnly: false,
    run: (client, msg, args) => {
        var q = !args[0].match(/<@[\d]+>/g) ? args.join(" ") : msg.mentions.users.first();
        if (q === undefined) { return msg.channel.send('\u26A0 \u276f  Give me something to rate.')}
        var r = getRandomInt(0, 10);
        if (typeof q == 'object') { if (q.id == client.user.id) { r = 10; q = 'myself' } };
        if (typeof q == 'object') { if (q.id == config.ownerID) { r = 10; q = q.username + '-sama' } };
        if (typeof q == 'object') { q = q.username };
        msg.channel.send(`\uD83D\uDCCB \u276f  I'd give ${replaceAll(q, dict)} a ${r}/10`);
    }
}