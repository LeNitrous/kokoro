const util      = require('../utils/utils.js'),
      config    = require('../config.json');

module.exports = {
    help: 'Delete up to 100 messages.',
    usage: '<Number> "Bot|User"',
    serverOnly: true,
    run: (client, msg, args) => {
        var user    = args[1];
        var num     = args[0];
        if (!msg.guild.me.hasPermission("MANAGE_MESSAGES")) {msg.channel.send(config.replySet.noPermsBot); return};
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) {msg.channel.send(config.replySet.noPermsUser); return};
        if (isNaN(num)) {msg.channel.send('Specify the number of messages to delete.'); return;}
        if (user !== undefined) {
            if (user.toLowerCase() == 'bot') {
                user = msg.guild.me.id
            } else if (user.startsWith('<@')) {
                if (user.startsWith('<@&')) {msg.channel.send('Specify a user.'); return;};
                user = msg.mentions.members.first().id
            } else {
                msg.channel.send('Specify a user.');
                return;
            }
        }
        if (num > 100) {num = 100}
        msg.channel.fetchMessages({limit: num})
            .then(messages => {
                console.log(`Deleting ${num} messages in #${msg.channel.name} ${Boolean(user) ? `by ${msg.mentions.members.first().displayName}` : '' }...`)
                msg.channel.bulkDelete(user === undefined ? messages : messages.filter(u=>u.member.id == user))
                    .then(res => {}, err => {},
                        msg.channel.send(`Deleting ${num} messages.`)
                            .then(message => message.delete(3000)
                            .catch(err => console.log(err)), err => console.log(err)));
            }, err => {console.log(err)})
    }
}