module.exports = {
    name: 'Do Job',
    desc: 'Force a cron job to trigger',
    preq: ['BotOwnerOnly'],
    args: [
        {name: "name", desc: "Job name to trigger (CASE SENSITIVE)"}
    ],
    task: (Kokoro, msg, args) => {
        var name = args.join(" ");
        if (!Kokoro.jobs[name])
            return Kokoro.send(msg.channel, "❎", "There is no job with that name.");
        else {
            Kokoro.doJob(name);
            Kokoro.send(msg.channel, "⌚", `doing ${name}...`);
        }
    }
};