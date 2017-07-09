const Discord       = require('discord.js'),
      stripIndent   = require('common-tags').stripIndent;

function formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    
    var day     = date.getDate();
    var month   = date.getMonth();
    var year    = date.getFullYear();

    return monthNames[month] + ' ' + day + ', ' + year;
}

function formatTime(date) {
    var hours   = date.getHours();
    var minutes = date.getMinutes();
    var meridem = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + meridem;
}

module.exports = {
    help: 'View server information',
    serverOnly: true,
    run: (client, msg, args) => {
        const embed = new Discord.RichEmbed()
            .setTitle('\u276f ' + msg.guild.name)
            .setDescription(`Created at ${formatDate(msg.guild.createdAt)} at ${formatTime(msg.guild.createdAt)}`)
            .setThumbnail(msg.guild.iconURL)
            .addField('Server Info', stripIndent`
            \u2022 Region: ${msg.guild.region}
            \u2022 Members: ${msg.guild.members.filter(m=>m.user.presence.status !== "offline").size}/${msg.guild.memberCount}
            \u2022 Roles: ${msg.guild.roles.size}
            \u2022 Emojis: ${msg.guild.emojis.size}/50
            \u2022 Text Channels: ${msg.guild.channels.filter(t=>t.type=== "text").size}
            \u2022 Voice Channels: ${msg.guild.channels.filter(t=>t.type=== "voice").size}
            `)
            .setColor([255, 64, 64])
            .setFooter(`Owned by ${msg.guild.owner.user.username}#${msg.guild.owner.user.discriminator}`, msg.guild.owner.user.avatarURL)
        msg.channel.send({embed})
    }
}