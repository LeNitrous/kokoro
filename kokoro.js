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
    if (!Kokoro.settings.get("cache")) {
        Kokoro.settings.set("cache", settings.cache);
    }
    Array.from(Kokoro.guilds.keys()).forEach(id => {
        if (!Kokoro.settings.get("guild")[id]) {
            var guild = Kokoro.settings.get("guild");
            guild[id] = settings.guild;
            Kokoro.settings.set("guild", guild);
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
    var event = require("./events/" + file);
    event.name = file.split(".")[0];
    event.event = file.split(".")[0];
    Kokoro.loadEvent(event);
});

fs.readdirSync("./jobs/").forEach(file => {
    var job = require("./jobs/" + file);
    job.name = file.split(".").shift();
    Kokoro.loadJob(job);
});

Kokoro.start();

var settings = {
    cache: {
        events: {
            en: null,
            jp: null,
            tw: null,
            kr: null
        }
    },
    guild: {
        birthday: null,
        eventChannelEN: null,
        eventChannelJP: null,
        eventChannelTW: null,
        eventChannelKR: null,
        eventMsgEN: "[BanG Dream! EN] **New Event!**",
        eventMsgJP: "[BanG Dream! JP] **New Event!**",
        eventMsgTW: "[BanG Dream! TW] **New Event!**",
        eventMsgKR: "[BanG Dream! KR] **New Event!**",
        birthdayMsg: "[BanG Dream!] **Happy Birthday!**"
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

Kokoro.defaultSettings = settings;