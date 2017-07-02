const util      = require('../utils/utils.js'),
      config    = require('../config.json');

module.exports = {
    help: 'Boot a user off your guild.',
    usage: '<User> "Reason"',
    serverOnly: true,
    run: (client, msg, args) => {
        var user      = msg.mentions.users.first();
        args.shift();
        var text = args.join(" ");
        if (!msg.guild.me.hasPermission("KICK_MEMBERS")) {msg.channel.send(config.replySet.noPermsBot); return;};
        if (!msg.member.hasPermission("KICK_MEMBERS")) {msg.channel.send(config.replySet.noPermsUser); return;};
        if (text === undefined) {text = 'No reason specificed.'};
        if (user === undefined) {util.sendcmdhelp(msg, 'kick', config.prefix, module.exports.help, module.exports.usage); return;}
        if (user == msg.author.id) {msg.channel.send(`\uD83D\uDED1 You can't kick yourself!`); return;}
        if (msg.member.kickable) {
            user.dmChannel.send(`You have been kicked off from **${msg.guild.name}** by **${msg.author.username}**.\n\n**Reason:** ${text}`)
               .catch(console.error);
            msg.channel.send(`Kicked ${user.username}.`)
                .then(m=> m.delete(3000)
                .catch(err => console.log(err)), err => console.log(err));
            msg.member.kick(text);
        } else {
            msg.channel.send(`\uD83D\uDED1 I can\'t kick ${msg.member.displayName}!`);
        }
    }
}