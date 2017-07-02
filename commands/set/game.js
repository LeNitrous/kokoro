module.exports = {
    help: 'Sets the bot\'s game.',
    usage: '<Text>',
    ownerOnly: true,
    run: (client, msg, args) => {
        var text = args.join(' ');
        msg.client.user.setGame(text);
        msg.channel.send('Game successfully changed!');
    }
}