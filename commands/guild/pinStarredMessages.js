const setting = require('../../data/guildSettings.json'),
      util = require('../../utils/utils.js');

module.exports = {
    help: "Allow Star Reaction to pin messages to a specific channel.",
    usage: '<channel>',
    run: (client, msg, args) => {
        if (!msg.member.hasPermission("MANAGE_SERVER")) { return msg.channel.send(config.replySet.noPermsUser) };
        if (args[0] == undefined) {
            delete setting[msg.guild.id].guildStarredMessageChannel; 
            util.SaveFile('./data/guildSettings.json', setting); 
            msg.channel.send(`\uD83D\uDD27 \u276f  Star Message Pins are now disabled.`)
            return;           
        }
        var channel = msg.guild.channels.find('name', args[0])
        if (!channel) { return msg.channel.send('\u26A0 \u276f  Invalid Arguments.') };
        if (channel.type == 'voice') { return msg.channel.send('\u26A0 \u276f  Cannot use a Voice Channel.') };
        if (!setting[msg.guild.id]) { setting[msg.guild.id] = {} };
        setting[msg.guild.id].guildStarredMessageChannel = channel.id; 
        util.SaveFile('./data/guildSettings.json', setting);
        msg.channel.send(`\uD83D\uDD27 \u276f  Star Message Pins are now set in <#${channel.id}>`)
    }
}