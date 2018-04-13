const Bandori = require("../mods/node-dori");
const Api = new Bandori({region: "en"});

module.exports = {
    time: "00 00 09 * * *",
    timezone: "Asia/Singapore",
    task: (Kokoro) => {
        console.log("[Event EN] Checking for new events...");
        Api.getCurrentEvent()
            .then(event => {
                var guild = Kokoro.settings.get("guild");
                var cache = Kokoro.settings.get("cache");
                if (cache.events.en === null) {
                    cache.events.en = { event: { id: 0 } };
                }
                if (cache.events.en.event.id != event.id) {
                    Object.keys(guild).forEach(id => {
                        if (!guild[id].eventChannelEN) return;
                        var property = guild[id].eventChannelEN;
                        property = property.substring(2, property.length -1);
                        var channel = Kokoro.guilds.get(id).channels.get(property);
                        channel.send(guild[id].eventMsgEN);
                        Kokoro.invoke(channel, ["gbp", "event", "en", "--force"]);
                    });
                }
            })
            .catch(error => {
                throw new Error(error.stack);
            });
    }
}