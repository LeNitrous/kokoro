const Bandori = require('../../mods/BandoriHandler.js');

module.exports = {
    name: "BanG Dream! Cards",
    desc: "Get current Girls Band Party event",
    help: 'Get current Girls Band Party event.',
    task: (Kokoro, msg, args) => {
        Bandori.Api.getCurrentEvent()
            .then(event => 
                Promise.all([
                    event.getLocale(),
                    event.getCards(),
                    event.getMusic()
                    
                ]).then(response => {
                    var embed = Bandori.embedEvent(event, response[0], response[1], response[2]);
                    msg.channel.send(embed);
                })
            )
            .catch(error => {
                if (error.status == 400)
                        return Kokoro.Bot.send(msg.channel, "❎", "There is no event found");
                Kokoro.throwError(msg, error);
            });
    }
};