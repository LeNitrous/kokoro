const Discord = require('discord.js');

module.exports = {
    help: 'Gets a user\'s avatar.',
    usage: '<User>',
    serverOnly: true,
    run: (client, msg, args) => {
        var user        = msg.mentions.users.first() !== undefined ? msg.mentions.users.first() : msg.author;
        var userGuild   = msg.guild.member(user)
        const embed = new Discord.RichEmbed()
            .setTitle(`${userGuild.displayName}'s avatar`)
            .setImage(user.avatarURL);
        msg.channel.send({embed});
    }
}