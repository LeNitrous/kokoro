const request = require('superagent');

module.exports = {
    help: 'Fetch Producer Profiles!',
    usage: '<Game ID>',
    run: (client, msg, args) => {
        var game_id = args[0];
        msg.channel.startTyping();
        request.get(`https://deresute.me/${game_id}/large`)
            .end((error, item) => {
                if (error && item.status === 404 || item.status === 400) {msg.channel.send('Producer not found.'); msg.channel.stopTyping(); return};
                msg.channel.send('', {files: [{attachment:`https://deresute.me/${game_id}/large`, name: 'producer.jpg'}]})
                    .then(m => {
                    msg.channel.stopTyping();
                });
            })
    }
}