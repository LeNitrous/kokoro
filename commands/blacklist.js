const list = require('../data/blacklist.json'),
      util = require('../utils/utils.js');

module.exports = {
    help: "Toggle user blacklist from sending reports",
    usage: "<user id>",
    ownerOnly: true,
    run: (client, msg, args) => {
        var user = args[0];
        if (!list[user]) {
            list.push(user)
            msg.channel.send(`\u1F4CB \u276f  Blacklisted **${client.users.find('id', user).tag}**.`)
            util.SaveFile('./data/blacklist.json', list);
        }
        else {
            var tar = list.indexOf(user);
            if (tar > -1) {list.splice(tar, 1)};
            msg.channel.send(`\u1F4CB \u276f  Unblacklisted **${client.users.find('id', user).tag}**.`)
            util.SaveFile('./data/blacklist.json', list);
        };
    }
}