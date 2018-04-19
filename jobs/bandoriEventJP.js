const Bandori = require("../mods/node-dori");
const Api = new Bandori({region: "jp"});

module.exports = {
    time: "00 00 15 * * *",
    timezone: "Asia/Tokyo",
    task: (Kokoro) => {
        console.log("[Event JP] Checking for new events...");
        var cache = Kokoro.settings.get("cache");
        if (cache.events.jp === null) {
            cache.events.jp = { event: { end: 0 } };
        }
        if (cache.events.jp.event.end <= new Date().getTime()) {
            Api.getCurrentEvent()
                .then(event => {
                    var guild = Kokoro.settings.get("guild");
                    Object.keys(guild).forEach(id => {
                        if (!guild[id].eventChannelJP) return;
                        var property = guild[id].eventChannelJP;
                        property = property.substring(2, property.length -1);
                        var channel = Kokoro.guilds.get(id).channels.get(property);
                        channel.send(guild[id].eventMsgJP);
                        Kokoro.invoke(channel, ["gbp", "event", "jp", "--force"]);
                    });
                })
                .catch(error => {
                    throw new Error(error.stack);
                });  
        }
    }
}