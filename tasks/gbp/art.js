const Bandori = require('../../mods/BandoriHandler.js');

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

module.exports = {
    name: "BanG Dream! Art",
    desc: "View BanG Dream! card art",
    help: "View BanG Dream! card art by searching using keywords or by ID.",
    args: [
        {name: "state", desc: '"trained" or "normal" card state', optional: true},
        {name: "id", desc: "A numeric ID for direct search", optional: true},
        {name: "name", desc: "Character's first name"},
        {name: "rarity", desc: "Card rarity"},
        {name: "attribute", desc: "Card attribute"},
    ],
    task: (Kokoro, msg, args) => {
        args = args.map(val => val.toLowerCase());
        var allowStates = ['trained', 'normal'];
        var state = args.filter(str => allowStates.includes(str) );
        if (state.length > 0) {
            state = state.shift();
            args.remove(state);
        }
        else
            state = 'normal';
        if (args.length <= 0)
            return Kokoro.send(msg, "❎", "Search cannot be empty");
        else if (args.length <= 1 && !isNaN(args[0])) {
            Bandori.Api.getCardByID(args[0])
                .then(card =>
                    msg.channel.send(Bandori.embedCardArt(card, state))
                )
                .catch(error => {
                    if (error.staus == 400)
                        return Kokoro.send(msg.channel, "❎", "There is no card with that ID");
                    Kokoro.throwError(msg, error);
                });
        }
        else {
            Bandori.Api.getCardByQuery(args)
                .then(cards =>
                    msg.channel.send(Bandori.embedCardArt(cards, state))
                )
                .catch(error => {
                    if (error.status == 400)
                        return Kokoro.send(msg.channel, "❎", "There were no matches found");
                    Kokoro.throwError(msg, error);
                });
        }
    }
};