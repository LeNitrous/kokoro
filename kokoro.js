const Bot = require("./mods/tasker");
const conf = require("./config.json");
const fs = require("fs");

const Kokoro = new Bot({
    tasks: "tasks/**",
    token: conf.token,
    prefix: conf.prefix,
    ownerID: conf.owners,
    logError: true
});

Kokoro.setGuildOption = (guildId, key, value) => {
    if (!fs.existsSync("./data.json")) {
        fs.writeFileSync("./data.json", JSON.stringify({}));
    }
    guildId += "";
    var data = require("./data.json");
    if (!data[guildId]) {
        data[guildId] = {};
    }
    if (value) {
        data[guildId][key] = value;
    }
    else {
        data[guildId][key] = undefined;
    };
    fs.writeFile("./data.json", JSON.stringify(data),
        (err) => {
            if (err) Kokoro.throwError("An error occured saving data", err);
        });
}

Kokoro.getGuildOption = (guildId, key) => {
    if (!fs.existsSync("./data.json")) return;
    var data = require("./data.json");
    guildId += "";
    if (!data[guildId]) return;
    if (!data[guildId][key]) return;
    return data[guildId][key];
}

Kokoro.on("ready", () => {
    Kokoro.user.setActivity(
        `${Kokoro.prefix}help`,
        {type: "LISTENING"}
    )
});

Kokoro.loadEvent(require("./mods/eventNewMember.js"));
Kokoro.loadJob(require("./mods/jobBandoriEvent.js"));
Kokoro.loadJob(require("./mods/jobBandoriBirthday.js"));
Kokoro.start();
