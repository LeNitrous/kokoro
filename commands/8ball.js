const responses = [
    // +
    "Certainly",
    "Of course",
    "Without a doubt",
    "Definitely",
    "As far as I can see, it's a yes",
    "Most likely",
    "Yes",
    // ?
    "Try asking again later",
    "Kinda gotten confused here",
    "I can't tell you right now",
    "Speak slowly and ask me again",
    "It's best not to tell you now",
    "I can't say",
    "I'm clueless",
    // -
    "No",
    "Nope",
    "Very doubtful",
    "Don't count on it",
    "Unlikely",
    "My intuition says no",
    "Not a chance"
];

module.exports = {
    help: "The magic 8-ball!",
    usage: "<question>",
    run: (client, msg, args) => {
        var q = args.join(" ");
        if (!q)
            return msg.channel.send('\uD83C\uDFB1 \u276f  Try asking a question.');
        msg.channel.send(`\uD83C\uDFB1 \u276f  ${responses[Math.floor(responses.length * Math.random())]}, **${msg.author.username}**.`)
    }
}