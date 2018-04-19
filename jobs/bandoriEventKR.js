const Bandori = require("../mods/node-dori");
const Api = new Bandori({region: "kr"});

module.exports = {
    time: "00 00 15 * * *",
    timezone: "Asia/Seoul",
    task: (Kokoro) => {
        console.log("[Event KR] Checking for new events...");
        var cache = Kokoro.settings.get("cache");
        if (cache.events.kr === null) {
            cache.events.kr = { event: { end: 0 } };
        }
        if (cache.events.kr.event.end <= new Date().getTime()) {
            Api.getCurrentEvent()
                .then(event => {
                    var guild = Kokoro.settings.get("guild");
                    Object.keys(guild).forEach(id => {
                        if (!guild[id].eventChannelKR) return;
                        var property = guild[id].eventChannelKR;
                        property = property.substring(2, property.length -1);
                        var channel = Kokoro.guilds.get(id).channels.get(property);
                        channel.send(guild[id].eventMsgKR);
                        Kokoro.invoke(channel, ["gbp", "event", "kr", "--force"]);
                    });
                })
                .catch(error => {
                    throw new Error(error.stack);
                }); 
        }
    }
}