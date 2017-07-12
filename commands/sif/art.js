const sif = require('../../utils/node-sif');

module.exports = {
    help: 'School idol festival Card Art. Add "idolized" flag to show alternate art',
    usage: '<ID> "idolized"',
    run: (client, msg, args) => {
        var id = args[0];
        var flag = args[1] != undefined ? args[1].toLowerCase() : undefined;
        var art;
        msg.channel.startTyping();
        sif.getCardsByID(id)
        .then(card => {
            art = flag == "idolized" ? card.card_idolized_image : card.card_image;
            art = art == null ? card.card_image : art;
            msg.channel.send('', {files: [{attachment: "https:" + art, name: 'sif_art.jpg'}]})
                .then(m => {
                    msg.channel.stopTyping();
                });
        })
        .catch(err => {
            console.log(err.stack);
            msg.channel.send('\u26A0 \u276f  Card not found');
            msg.channel.stopTyping();
        });
    }
}