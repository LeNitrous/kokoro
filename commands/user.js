const Discord	    = require('discord.js'),
      stripIndent   = require('common-tags').stripIndent;

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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
    var meridem = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + meridem;
}

module.exports = {
    help: 'View user information by mentions. Leave empty to view yourself.',
    usage: '<User>',
    serverOnly: true,
    run: (client, msg, args) => {
        var user        = msg.mentions.users.first() !== undefined ? msg.mentions.users.first() : msg.author;
        var userGuild   = msg.guild.member(user)
        var status      = user.presence.game == null ? capitalize(user.presence.status) : `playing ${user.presence.game.name}`;
        status == "Dnd" ? status = "Away" : status = status;
        var Role        = userGuild.highestRole == null ? 'None' : userGuild.highestRole;
        var statusIcon  = {
            offline: 'https://dummyimage.com/200x200/747F8D/00000.jpg&text=+',
            online: 'https://dummyimage.com/200x200/43b582/online.jpg&text=+',
            idle: 'https://dummyimage.com/200x200/FAA61A/00000.jpg&text=+',
            dnd: 'https://dummyimage.com/200x200/F04747/00000.jpg&text=+',
        };
        const embed = new Discord.RichEmbed()
            .setAuthor('\u276f \xa0\xa0' + userGuild.displayName, statusIcon[user.presence.status])
            .setThumbnail(user.avatarURL)
            .setDescription('is ' + status)
            .setColor(userGuild.displayHexColor)
            .addField('User Info', stripIndent`
            \u2022 ${user.tag}
            \u2022 Role: ${Role}
            \u2022 Created: ${formatDate(user.createdAt)} at ${formatTime(user.createdAt)}
            \u2022 Joined: ${formatDate(userGuild.joinedAt)} at ${formatTime(userGuild.joinedAt)}
            `)
        msg.channel.send({embed})
    }
}