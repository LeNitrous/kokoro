const config    = require('../config.json');

module.exports = {
    help: 'Bans a user off your guild.',
    usage: '<mention> <reason>',
    serverOnly: true,
    run: (client, msg, args) => { 
        var member = msg.mentions.members.first();
        args.shift();
        var text = args.join(" ");
        if (!msg.guild.me.hasPermission("BAN_MEMBERS")) { return msg.channel.send(config.replySet.noPermsBot) };
        if (!msg.member.hasPermission("BAN_MEMBERS")) { return msg.channel.send(config.replySet.noPermsUser) };
        if (msg.member.highestRole.position <= member.highestRole.position) { return msg.channel.send(config.replySet.noPermsUser) };
        if (member === undefined) { return msg.channel.send('\u26A0 \u276f  Specify a user to ban.') };
        if (text.length <= 0) {text = 'No reason specificed.'};
        if (member == msg.author.id) { return msg.channel.send(`\u26A0 \u276f  You can't ban yourself!`) };
        if (member.bannable) {
            member.user.send(`You have been banned from **${msg.guild.name}** by **${msg.author.username}**.\n\n**Reason:** ${text}`)
               .catch(console.error);
            msg.channel.send(`\u1F6AB \u276f  Banned **${member.user.username}**.\n\n**Reason:** ${text}`);
            member.ban({reason: text});
        }
        else {
            msg.channel.send(`\u26A0 \u276f  **${member.user.username}** can't be banned.`);
        };
    }
}