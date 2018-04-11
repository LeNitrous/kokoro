const Bandori = require("../mods/node-dori");
const Api = new Bandori({region: "jp"});

const region = "jp";

module.exports = {
    time: "00 00 15 * * *",
    timezone: "Asia/Tokyo",
    task: (Kokoro) => {
        console.log("[Event JP] Checking for new events...");
        Api.getCurrentEvent()
            .then(event => {
                var guild = Kokoro.settings.get("guild");
                var cache = Kokoro.settings.get("cache");
                if (cache.events[region] === null) {
                    cache.events[region] = { event: { id: 0 } };
                }
                if (cache.events[region].event.id != event.id) {
                    Object.keys(guild).forEach(id => {
                        if (!guild[id].eventChannelJP) return;
                        var channel = Kokoro.guilds.get(id)
                            .channels.get(guild[id].eventChannelJP);
                        channel.send(guild[id].eventMsgJP);
                        Kokoro.invoke(channel, ["gbp", "event", region, "--force"]);
                    });
                }
            })
            .catch(error => {
                throw new Error(error.stack);
            });
    }
}