module.exports = {
    name: "Help",
    desc: "Bot task listing",
    help: "Send yourself a list of useable tasks within the bot.",
    args: [
        {name: "command", desc: "Command name"}
    ],
    task: (Kokoro, msg, args) => {
        var help = Kokoro.handler.help(Kokoro, msg, args);
        msg.author.send(help, {code: "md"});
    }
};