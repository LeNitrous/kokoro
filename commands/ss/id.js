const request = require('superagent'),
      list    = require('../../data/link.json');

module.exports = {
    help: 'Fetch Producer Profiles.',
    usage: '<mention/id>',
    run: (client, msg, args) => {
        var u = args[0];
        var f;
        if (u === undefined) { u = msg.author }
        else if (u.match(/<@[\d]+>/g) || u.match(/<@![\d]+>/g)) { u = msg.mentions.users.first() };
        if (typeof u == 'object') { 
            f = msg.mentions.users.first()
            if (list[msg.guild.id] && list[msg.guild.id][u.id] && list[msg.guild.id][u.id].deresute) {
                u = list[msg.guild.id][u.id].deresute;
            }
            else {
                u = undefined;
            }
        };
        if (u == undefined) { return msg.channel.send(`\u26A0 \u276f  ${f.username} doesn't have a linked Deresute account yet.`) };
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