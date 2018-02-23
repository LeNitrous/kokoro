module.exports = {
    name: 'Send',
    desc: 'Send a message to a channel',
    preq: ['BotOwnerOnly'],
    task: (Kokoro, msg, args) => {
        var guild = args.shift();
        var chan = args.shift();
        if (isNaN(guild))
            return Kokoro.Bot.send(msg.channel, "❎", "First argument must be a guild id");
        if (isNaN(chan))
            return Kokoro.Bot.send(msg.channel, "❎", "Second argument must be a channel id");
        Kokoro.guilds.find('id', guild).channels.find('id', chan).send(args);
    }
};