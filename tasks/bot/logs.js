const fs = require("fs");

module.exports = {
    name: 'Error Log',
    desc: 'Show last caught execption',
    preq: ['BotOwnerOnly'],
    task: (Kokoro, msg, args) => {
        fs.readFile('./error.log', 'utf8', (err, data) => {
            if (err) throw new Kokoro.Bot.error(module.exports.name, err);
            data = data.split('\n');
            var exceptionDate = data.shift();
            msg.channel.send(exceptionDate);
            msg.channel.send(data.join('\n'), {code: 'xl'});
        });
    }
};