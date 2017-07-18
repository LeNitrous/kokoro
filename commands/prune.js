const util      = require('../utils/utils.js'),
      config    = require('../config.json');

module.exports = {
    help: 'Delete up to 100 messages.',
    usage: '<number> <bot/mention>',
    serverOnly: true,
    run: (client, msg, args) => {
        var num     = args[0];
        var user    = args[1];
        if (!msg.guild.me.hasPermission("MANAGE_MESSAGES")) { return msg.channel.send(config.replySet.noPermsBot) };
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) { return msg.channel.send(config.replySet.noPermsUser) };
        if (isNaN(num)) {msg.channel.send('\u26A0 \u276f  Specify the number of messages to delete.'); return;}
        if (user !== undefined) {
            if (user.toLowerCase() == 'bot') { user = msg.guild.me }
            else if (user.match(/<@[\d]+>/g) || user.match(/<@![\d]+>/g)) { 
                user = msg.mentions.members.first()
            }
            else { return msg.channel.send('\u26A0 \u276f  Specify a user.') };
            if (msg.member.highestRole.position <= user.highestRole.positon && msg.member.id != user.id) { return msg.channel.send(config.replySet.noPermsUser) };
        }
        if (num > 100) { num = 100 }
        msg.channel.fetchMessages({limit: num})
            .then(messages => {
                console.log(`Deleting ${num} messages in #${msg.channel.name}${Boolean(user) ? ` by ${user.user.username}` : '' }...`)
                msg.channel.bulkDelete(user === undefined ? messages : messages.filter(u=>u.member.id == user.id))
                    .then(res => {}, err => {},
                        msg.channel.send(`:wastebasket: \u276f  Deleting ${num} messages${Boolean(user) ? ` by ${user.user.username}` : '' }.`)
                            .then(message => message.delete(1500)
                            .catch(err => console.log(err)), err => console.log(err)));
            }, err => {console.log(err)})
    }
}