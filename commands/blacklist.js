const list = require('../data/blacklist.json');

module.exports = {
    help: "Toggle user blacklist from sending reports",
    usage: "<User ID>",
    ownerOnly: true,
    run: (client, msg, args) => {
        var user = args[0];
        if (!list[user]) {
            list.push(user)
            msg.channel.send(`\u1F4CB \u276f  Blacklisted **${client.users.find('id', user).tag}**.`)
        }
        else {
            var tar = list.indexOf(user);
            if (tar > -1) {list.splice(tar, 1)};
            msg.channel.send(`\u1F4CB \u276f  Unblacklisted **${client.users.find('id', user).tag}**.`)
        };
    }
}