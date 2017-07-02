module.exports = {
    help: 'Sets the bot\'s game and streaming status.',
    usage: '"<Text>" <Twitch URL>',
    ownerOnly: true,
    run: (client, msg, args) => {
        args.join(' ');
        var text = args.match(/\w+|"(?:\"|[^"])+"/g)[0].replace(/['"]+/g, '');
        var stream = args.match(/\w+|"(?:\"|[^"])+"/g)[1];
        msg.client.user.setGame(text, stream);
        msg.channel.send('Stream successfully changed!');
    }
}