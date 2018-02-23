function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

module.exports = {
    name: 'Avatar',
    desc: 'Change bot avatar',
    preq: ['BotOwnerOnly'],
    task: (Kokoro, msg, args) => {
        var url = args[0];
        if (!url.startsWith('https://' || !url.startsWith('http://')) && !checkURL(url))
            return Kokoro.Bot.send(msg.channel, "❎", "Argument must be a valid URL");
        Kokoro.user.setAvatar(url);
        Kokoro.Bot.send(msg.channel, "✅", "Avatar successfully changed");
    }
};