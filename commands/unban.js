const config    = require('../config.json');

module.exports = {
    help: 'Revokes a ban from a user.',
    usage: '<mention>',
    ownerOnly: true,
    serverOnly: true,
    run: (client, msg, args) => {
        var user      = args.join(' ');
        if (user === undefined) { return util.sendcmdhelp(msg, 'unban', config.prefix, module.exports.help, module.exports.usage) };
        if (!msg.guild.me.hasPermission("BAN_MEMBERS")) { return msg.channel.send(config.replySet.noPermsBot) };
        msg.guild.fetchBans()
            .then(u => {
                var target = u.findKey('username', user);
                msg.guild.unban(target);
                msg.channel.send(`\u1F4A1 \u276f  Unbanned **${user}**.`)
                    .then(m=> m.delete(3000)
                    .catch(err => console.log(err)), err => console.log(err));
            }, err => {
                msg.channel.send(`\u1F6AB \u276f  Cannot revoke ban on **${user}**.`)
            });
    }
}