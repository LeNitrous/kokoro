const path = require('path');

module.exports = {
    help: 'Play a song',
    usage: '<Name>',
    ownerOnly: true,
    run: (client, msg, args) => {
        var item = args[0];
        if(!Boolean(msg.member.voiceChannel)) {
            msg.channel.send('You are not in a voice channel!')
            return;
        };
        const active_channel = msg.member.voiceChannel;
        active_channel.join()
            .then(c => {
                const player = c.playFile(path.resolve(`data/songs/${item}.mp3`))
                player.on('end', () => active_channel.leave());
            })
            .catch(e => {
                console.log(e)
            });
    }
}