const Bandori = require("../mods/node-dori");
const Api = new Bandori({region: "tw"});

module.exports = {
    time: "00 00 15 * * *",
    timezone: "Asia/Taipei",
    task: (Kokoro) => {
        console.log("[Event TW] Checking for new events...");
        var cache = Kokoro.settings.get("cache");
        if (cache.events.tw === null) {
            cache.events.tw = { event: { end: 0 } };
        }
        if (cache.events.tw.event.end <= new Date().getTime()) {
            Api.getCurrentEvent()
                .then(event => {
                    var guild = Kokoro.settings.get("guild");
                    Object.keys(guild).forEach(id => {
                        if (!guild[id].eventChannelTW) return;
                        var property = guild[id].eventChannelTW;
                        property = property.substring(2, property.length -1);
                        var channel = Kokoro.guilds.get(id).channels.get(property);
                        channel.send(guild[id].eventMsgTW);
                        Kokoro.invoke(channel, ["gbp", "event", "tw", "--force"]);;
                    });
                })
                .catch(error => {
                    throw new Error(error.stack);
                });
        }
        
    }
}