const Bot = require("./mods/tasker");
const conf = require("./config.json");

const Kokoro = new Bot({
    tasks: "tasks/**",
    token: conf.token,
    prefix: "~!",
    ownerID: conf.owners,
    logError: true
});

Kokoro.on("ready", () => {
    Kokoro.user.setActivity(
        `${Kokoro.prefix}help`,
        {type: "LISTENING"}
    )
});

Kokoro.start();
