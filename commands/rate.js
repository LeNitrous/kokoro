const config = require('../config.json');
      seedrandom = require('seedrandom');

function getRandomInt(min, max, seed) {
  min = Math.ceil(min);
  max = Math.floor(max);
  seedrandom(seed, { global: true });
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    help: 'Rates something.',
    usage: '<question>',
    ownerOnly: false,
    serverOnly: false,
    run: (client, msg, args) => {
        var q = args.join(" ");
        if (q.match(/<@[\d]+>/) || q.match(/<@![\d]+>/)) { q = msg.mentions.users.first() };
        if (q === undefined) { return msg.channel.send('\u26A0 \u276f  Give me something to rate.') };
        var r = getRandomInt(0, 10, q);
        if (typeof q == 'object') { if (q.id == client.user.id) { r = 10; q = 'myself' } };
        if (typeof q == 'object') { if (q.id == config.ownerID) { r = 10; q = q.username + '-sama' } };
        if (typeof q == 'object') { q = q.username };
        msg.channel.send(`\uD83D\uDCCB \u276f  I'd give ${q} a ${r}/10`);
    }
}