const Bandori = require("../mods/node-dori");
const Api = new Bandori({region: "jp"});

module.exports = {
    time: "00 * * * * *",
    timezone: "Asia/Tokyo",
    task: (Kokoro) => {
        Api.getCurrentEvent()
            .then(event => {
                var client = Kokoro.settings.get("client");
                var guild = Kokoro.settings.get("guild");
                var user = Kokoro.settings.get("user");
                //if (client.eventJP_id != event.id) {
                    client.eventJP_id = event.id;
                    Kokoro.settings.set("client", client);
                    Object.keys(guild).forEach(id => {
                        if (!guild[id].bandori.eventJP) return;
                        var channel = Kokoro.guilds.get(id)
                            .channels.get(guild[id].bandori.eventJP);
                        channel.send(guild[id].bandori.eventMsgJP);
                        Kokoro.invoke(channel, ["gbp", "event", "jp"]);
                    });
                    Object.keys(user).forEach(id => {
                        if (!user[id].subscriptions.eventJP) return;
                        var channel = Kokoro.users.get(id);
                        channel.send("[BanG Dream! JP] **New Event!**");
                        Kokoro.invoke(channel, ["gbp", "event", "jp"]);
                    });
                //}
            })
            .catch(error => {
                throw new Error(error.stack);
            });
    }
}