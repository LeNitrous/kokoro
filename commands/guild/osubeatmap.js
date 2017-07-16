const setting = require('../../data/guildSettings.json'),
      util = require('../../utils/utils.js');

module.exports = {
    help: "Allow beatmap URL detection.",
    run: (client, msg, args) => {
        if (!msg.member.hasPermission("MANAGE_SERVER")) { return msg.channel.send(config.replySet.noPermsUser) };
        if (!setting[msg.guild.id]) { setting[msg.guild.id] = {} };
        if (!setting[msg.guild.id].osuBeatmapDetect) { 
            setting[msg.guild.id].osuBeatmapDetect = true; 
            util.SaveFile('./data/guildSettings.json', setting);
            msg.channel.send(`\uD83D\uDD27 \u276f  Allowed beatmap detection in this guild.`)
            return ;
        };
        if (setting[msg.guild.id].osuBeatmapDetect == true) { 
            delete setting[msg.guild.id].osuBeatmapDetect; 
            util.SaveFile('./data/guildSettings.json', setting); 
            msg.channel.send(`\uD83D\uDD27 \u276f  Disallowed beatmap detection in this guild.`)
            return;
        };
    }
}