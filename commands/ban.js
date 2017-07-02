const   util      = require('../utils/utils.js'),
        config    = require('../config.json');

module.exports = {
    help: 'Bans a user off your guild.',
    usage: '<User> "Reason"',
    serverOnly: true,
    run: (client, msg, args) => {
        var user      = msg.mentions.users.first();
        args.shift();
        if (!msg.guild.me.hasPermission("BAN_MEMBERS")) {msg.channel.send(config.replySet.noPermsBot); return;};
        if (!msg.member.hasPermission("BAN_MEMBERS")) {msg.channel.send(config.replySet.noPermsUser); return;};
        var text = args.join(" ");
        if (text === undefined) {text = 'No reason specificed.'};
        if (user === undefined) {util.sendcmdhelp(msg, 'ban', config.prefix, module.exports.help, module.exports.usage); return;}
        if (user == msg.author.id) {msg.channel.send(`You can't ban yourself!`); return;}
        if (msg.member.bannable) {
            user.dmChannel.send(`You have been banned from **${msg.guild.name}** by **${msg.author.username}**.\n\n**Reason:** ${text}`)
               .catch(console.error);
            msg.channel.send(`Banned ${user.username}.`)
                .then(m=> m.delete(3000)
                .catch(err => console.log(err)), err => console.log(err));
            msg.member.ban({reason: text});
        }
        else {
            msg.channel.send(`I can\'t ban ${msg.member.displayName}!`)
                .then(m=> m.delete(3000)
                .catch(err => console.log(err)), err => console.log(err));
        }
    }
}