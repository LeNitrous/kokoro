function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

module.exports = {
    help: 'Set the bot\'s avatar.',
    usage: '<URL>',
    ownerOnly: true,
    run: (client, msg, args) => {
        var url = args[0];
        if (!url.startsWith('https://' || !url.startsWith('http://')) && !checkURL(url)) {msg.channel.send('Argument must be a URL!'); return;};
        msg.client.user.setAvatar(url);
        msg.channel.send('Avatar successfully changed!');
    }
}