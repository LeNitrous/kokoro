module.exports = {
    name: "Bandori Event",
    time: "00 00 15 * * *",
    timezone: "Asia/Tokyo",
    task: (Kokoro) => {
        var data = require("../data.json");
        var Bandori = require("./BandoriHandler.js");
        Bandori.Api.getCurrentEvent()
            .then(event => {
                Promise.all([
                    event.getCards(),
                    event.getMusic(),
                    event.getLocale()
                ])
                .then(response => {
                    if (!data.bandori)
                        Kokoro.setGuildOption("bandori", "event", event.id);
                    if (!data.bandori.event)
                        Kokoro.setGuildOption("bandori", "event", event.id);
                    if (data.bandori.event == event.id) return;
                    for (var val in data) {
                        if (data.hasOwnProperty(val)) {
                            if (data[val].bandori_birthdayChannel) {
                                var channel = Kokoro.guilds.find("id", val)
                                    .channels.find("id", data[val].bandori_eventChannel);
                                if (data[val].bandori_eventMessage)
                                    channel.send(data[val].bandori_eventMessage);
                                channel.send(Bandori.embedEvent(event, response[0], response[1], response[2]));
                            }
                        }
                    }
                })
            })
            .catch(error => {
                Kokoro.throwError(null, error);
            });
    }  
}