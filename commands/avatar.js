module.exports = {
    help: 'Gets a user\'s avatar. Leave blank to get your avatar.',
    usage: '<mention>',
    serverOnly: true,
    run: (client, msg, args) => {
        var user        = msg.mentions.users.first() !== undefined ? msg.mentions.users.first() : msg.author;
        var userGuild   = msg.guild.member(user)
        msg.channel.send(`:frame_photo: \u276f  **${user.username}**'s Avatar:`, {files: [{attachment: user.avatarURL, name: 'avatar.jpg'}]});
    }
}