const util      = require('../utils/utils.js'),
      config    = require('../config.json');

module.exports = {
    help: 'Revokes a ban from a user.',
    usage: '<User>',
    ownerOnly: true,
    serverOnly: true,
    run: (client, msg, args) => {
        var user      = args.join(' ');
        if (user === undefined) {util.sendcmdhelp(msg, 'unban', config.prefix, module.exports.help, module.exports.usage); return;}
        if (!msg.guild.me.hasPermission("BAN_MEMBERS")) {msg.channel.send(config.replySet.noPermsBot); return;};
        msg.guild.fetchBans()
            .then(u => {
                var target = u.findKey('username', user);
                msg.guild.unban(target);
                msg.channel.send(`Unbanned ${user}.`)
                    .then(m=> m.delete(3000)
                    .catch(err => console.log(err)), err => console.log(err));
            }, err => {util.sendcmdhelp(msg, 'unban', config.prefix, module.exports.help, module.exports.usage); console.log(err)});
    }
}