module.exports = {
    help: 'Ping the bot!',
    ownerOnly: false,
    serverOnly: false,
    run: (client, msg, args) => {
        var reply = [
            'Pong!',
            'Up!',
            'Yousoro!',
            'Yes!',
            'Nico Nii!'
        ];
        var randomReply = Math.floor(Math.random()*reply.length)
        msg.channel.send('Pinging...').then(sent => {
                        sent.edit(`**${reply[randomReply]}** | ${sent.createdTimestamp - msg.createdTimestamp}ms.`)
                    });
    }
}