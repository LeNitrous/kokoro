const request = require('superagent'),
      list    = require('../../data/link.json');

module.exports = {
    help: 'Fetch Producer Profiles.',
    usage: '<mention/id>',
    run: (client, msg, args) => {
        var u = !args[0].startsWith('<@') ? args[0] : msg.mentions.users.first();
        if (typeof u == 'object') { u = list[msg.guild.id][u.id].deresute };
        msg.channel.startTyping();
        request.get(`https://deresute.me/${u}/large`)
            .end((error, item) => {
                if (error && item.status === 404 || item.status === 400) {msg.channel.send('Producer not found.'); msg.channel.stopTyping(); return};
                msg.channel.send('', {files: [{attachment:`https://deresute.me/${u}/large`, name: `producer_${u}.jpg`}]})
                    .then(m => {
                    msg.channel.stopTyping();
                });
            })
    }
}