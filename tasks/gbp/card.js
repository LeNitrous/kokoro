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
    name: "BanG Dream! Cards",
    desc: "Search for BanG Dream! cards",
    help: "Search for BanG Dream! cards using keywords or by ID.",
    args: [
        {name: "search", desc: '"search" keyword for recursive search', optional: true},
        {name: "id", desc: "A numeric ID for direct search", optional: true},
        {name: "name", desc: "Character's first name"},
        {name: "rarity", desc: "Card rarity"},
        {name: "attribute", desc: "Card attribute"},
    ],
    task: (Kokoro, msg, args) => {
        var isSearch = args.includes('search');
        if (isSearch)
            args.remove('search');
        if (args.length <= 0) 
            return Kokoro.send(msg.channel, "❎", "Search cannot be empty");
        else if (args.length <= 1 && !isNaN(args[0]) && !isSearch) {
            Bandori.Api.getCardByID(args[0])
                .then(card =>
                    card.getLocale()
                        .then(locale => {
                            var embed = Bandori.embedCard(card, locale);
                            msg.channel.send(embed);
                        })
                )
                .catch(error => {
                    if (error.status == 400)
                        return Kokoro.send(msg.channel, "❎", "There is no card with that ID");
                    Kokoro.throwError(msg, error);
                });
        }
        else if (isSearch) {
            Bandori.Api.getCardByQuery(args)
                .then(cards =>
                    Bandori.sendSearch(msg.author, cards)
                )
                .catch(error => {
                    if (error.status == 400)
                        return Kokoro.send(msg.channel, "❎", "There were no matches found");
                    if (error.name == 'InvalidParameterError')
                        return Kokoro.send(msg.channel, "❎", "Incorrect query syntax");
                    Kokoro.throwError(msg, error);
                });
        }
        else {
            Bandori.Api.getCardByQuery(args)
                .then(card => 
                    card[0].getLocale()
                        .then(locale => {
                            var embed = Bandori.embedCard(card, locale);
                            msg.channel.send(embed);
                        })
                )
                .catch(error => {
                    if (error.stats == 400)
                        return Kokoro.send(msg.channel, "❎", "There were no matches found");
                    if (error.name == 'InvalidParameterError')
                        return Kokoro.send(msg.channel, "❎", "Incorrect query syntax");
                    Kokoro.throwError(msg, error);
                });
        };
    }
};