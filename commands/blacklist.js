const list = require('../data/blacklist.json');

module.exports = {
    help: "Toggle user blacklist from sending reports",
    usage: "<User ID>",
    ownerOnly: true,
    run: (client, msg, args) => {
        var user = args[0];
        if (!list[user]) {
            list.push(user)
            msg.channel.send(`Blacklisted **${client.users.find('id', user).tag}**.`)
        }
        else {
            var tar = list.indexOf(user);
            if (tar > -1) {list.splice(tar, 1)};
            msg.channel.send(`Unblacklisted **${client.users.find('id', user).tag}**.`)
        };
    }
}