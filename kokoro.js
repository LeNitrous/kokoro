const Bot = require("./mods/tasker");
const conf = require("./config.json");
const fs = require("fs");

const Kokoro = new Bot({
    tasks: "tasks/**",
    token: conf.token,
    prefix: conf.prefix,
    ownerID: conf.owners,
});

Kokoro.on("ready", () => {
    Kokoro.user.setActivity(
        `${Kokoro.prefix}help`,
        {type: "LISTENING"}
    );
    if (!Kokoro.settings.get("guild")) {
        Kokoro.settings.set("guild", {});
    }
    if (!Kokoro.settings.get("user")) {
        Kokoro.settings.set("user", {});
    }
    if (!Kokoro.settings.get("client")) {
        Kokoro.settings.set("client", settings.client);
    }
    Array.from(Kokoro.guilds.keys()).forEach(id => {
        if (!Kokoro.settings.get("guild")[id]) {
            Kokoro.settings.get("guild")[id] = settings.guild;
        }
    });
    Array.from(Kokoro.users.keys()).forEach(id => {
        if (!Kokoro.settings.get("user")[id]) {
            Kokoro.settings.get("user")[id] = settings.user;
        }
    });
});

Kokoro.on("guildCreate", guild => {
    Kokoro.settings.get("guild")[guild.id] = settings.guild;
});

fs.readdirSync("./events/").forEach(file => {
    Kokoro.loadEvent(require("./events/" + file));
});

fs.readdirSync("./jobs/").forEach(file => {
    var job = require("./jobs/" + file);
    job.name = file.split(".").shift();
    Kokoro.loadJob(job);
});

Kokoro.start();

var settings = {
    client: {
        eventEN_id: 0,
        eventJP_id: 0,
        eventTW_id: 0,
        eventKR_id: 0,
        version_jp: 0,
        version_en: 0,
        version_tw: 0,
        version_kr: 0
    },
    guild: {
        logger: null,
        bandori: {
            birthday: null,
            eventEN: null,
            eventJP: null,
            eventTW: null,
            eventKR: null,
            eventMsgEN: "[BanG Dream! JP] **New Event!**",
            eventMsgJP: "[BanG Dream! JP] **New Event!**",
            eventMsgTW: "[BanG Dream! TW] **New Event!**",
            eventMsgKR: "[BanG Dream! KR] **New Event!**",
            birthdayMsg: "[BanG Dream!] **Happy Birthday!**"
        }
    },
    user: {
        subscriptions: {
            eventEN: false,
            eventJP: false,
            eventTW: false,
            eventKR: false,
            birthday: false
        },
        accounts: {
            bandori_EN: null,
            bandori_JP: null,
            bandori_TW: null,
            bandori_KR: null
        }
    }
}
