const Deresute = require('../../utils/node-ss');

module.exports = {
    help: 'Starlight Stage Card Art. Add "--awakened" flag to show alternate art',
    usage: '<id>',
    run: (client, msg, args) => {
        var id = args[0];
        var flag = args[1] != undefined ? args[1].toLowerCase() : undefined;
        msg.channel.startTyping();
        if (flag != "--awakened") {
            Deresute.getCard(id)
            .then(card => {
                msg.channel.send('', {files: [{attachment: card.result[0].spread_image_ref, name: 'deresute_art.jpg'}]})
                    .then(m => {
                        msg.channel.stopTyping();
                    });
            })
            .catch(err => {
                console.log(err.stack);
                msg.channel.send('\u26A0 \u276f  Card not found.');
                msg.channel.stopTyping();
            });
        }
        else {
            Deresute.getCard(id)
            .then(card => {
                var evo = card.result[0].evolution_id == 0 ? card.result[0].id : card.result[0].evolution_id;
                Deresute.getCard(evo)
                .then(card => {
                    msg.channel.send('', {files: [{attachment: card.result[0].spread_image_ref, name: 'deresute_art.jpg'}]})
                        .then(m => {
                            msg.channel.stopTyping();
                        });
                })
                .catch(err => {
                    console.log(err.stack);
                    msg.channel.send('\u26A0 \u276f  Card not found.');
                    msg.channel.stopTyping();
                });
            })
            .catch(err => {
                console.log(err.stack);
                msg.channel.send('\u26A0 \u276f  Card not found.');
                msg.channel.stopTyping();
            });
        }
    }
}