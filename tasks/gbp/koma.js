const Bandori = require('../../mods/BandoriHandler.js');

module.exports = {
    name: "BanG Dream! Komas",
    desc: "Get a random one-frame cartoon",
    help: 'Get a random one-frame cartoon.',
    task: (Kokoro, msg, args) => {
        Bandori.Api.getKomas()
            .then(koma =>
                msg.channel.send(Bandori.embedKoma(msg.channel, koma[getRandomInt(koma.length)]))
            )
            .catch(error => {
                Kokoro.throwError(msg, error);
            });
    }
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}