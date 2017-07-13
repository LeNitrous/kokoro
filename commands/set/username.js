module.exports = {
    help: 'Sets the bot\'s username.',
    usage: '<name>',
    ownerOnly: true,
    run: (client, msg, args) => {
        var text = args.join();
        msg.client.user.setUsername(text);
        msg.channel.send('Username successfully changed!');
    }
}