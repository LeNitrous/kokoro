const setting = require('../../data/guildSettings.json'),
      util = require('../../utils/utils.js');

module.exports = {
    help: "Control role giving.",
    usage: '<role>',
    run: (client, msg, args) => {
        if (!msg.member.hasPermission("MANAGE_SERVER")) { return msg.channel.send(config.replySet.noPermsUser) };
        var input = args.join(" ");
        var role = msg.guild.roles.find('name', input);
        if (setting[msg.guild.id] && setting[msg.guild.id].blacklistedRoles) {
            if (setting[msg.guild.id].blacklistedRoles.includes(role.id)) {
                setting[msg.guild.id].blacklistedRoles.splice(setting[msg.guild.id].blacklistedRoles.indexOf(role.id), 1);
                util.SaveFile('./data/guildSettings.json', setting);
                return msg.channel.send(`\uD83D\uDD27 \u276f  Removed blacklist of **${role.name}** from self-roles.`);
            }
        };
        if (!role) { return msg.channel.send('\u26A0 \u276f  Invalid Arguments.') };
        if (!setting[msg.guild.id]) { setting[msg.guild.id] = {} };
        if (!setting[msg.guild.id].blacklistedRoles) { setting[msg.guild.id].blacklistedRoles = [] };
        setting[msg.guild.id].blacklistedRoles.push(role.id);
        util.SaveFile('./data/guildSettings.json', setting);
        msg.channel.send(`\uD83D\uDD27 \u276f  Blacklisted **${role.name}** from self-roles.`);
    }
}