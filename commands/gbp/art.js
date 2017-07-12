const Bandori = require('../../utils/node-bandori');

module.exports = {
    help: 'Bandori Card Art. Add "trained" flag to show alternate art',
    usage: '<ID> "trained"',
    run: (client, msg, args) => {
        var id = args[0];
        var flag = args[1] != undefined ? args[1].toLowerCase() : undefined;
        var art;
        msg.channel.startTyping();
        Bandori.getCard(id)
        .then(card => {
            art = flag == "trained" ? card.art_trained : card.art;
            art = art == null ? card.art : art;
            msg.channel.send('', {files: [{attachment: art, name: 'bandori_art.jpg'}]})
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
}