module.exports = {
    help: 'Gets a user\'s avatar.',
    usage: '<User>',
    serverOnly: true,
    run: (client, msg, args) => {
        var user        = msg.mentions.users.first() !== undefined ? msg.mentions.users.first() : msg.author;
        var userGuild   = msg.guild.member(user)
        msg.channel.send(`\u1F5BC \u276f  **${user.username}**'s Avatar:`, {files: [{attachment: user.avatarURL, name: 'avatar.jpg'}]});
    }
}