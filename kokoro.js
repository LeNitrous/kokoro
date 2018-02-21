const Bot = require("./src/Bot.js");
const Kokoro = new Bot({
    tasks: "tasks/**",
    token: "MzMxNTUyMDA0NTQ1NTc2OTYx.DWlrrA.agGdEljVlJn18dJdZF8USlJ0wtM",
    prefix: "~!",
    ownerID: ["170905486407761931"],
    logError: true
});

Kokoro.on("ready", () => {
    Kokoro.user.setActivity(
        `${Kokoro.prefix}help`,
        {type: "LISTENING"}
    )
});

Kokoro.start();
