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
    name: "BanG Dream! Music",
    desc: "Search for BanG Dream! music",
    help: "Search for BanG Dream! cards using keywords or by ID.",
    args: [
        {name: "search", desc: '"search" keyword for recursive search', optional: true},
        {name: "id", desc: "A numeric ID for direct search", optional: true},
        {name: "band", desc: "Band nickname"},
        {name: "type", desc: 'Available Options: "cover" or "original"'},
    ],
    task: (Kokoro, msg, args) => {
        var isSearch = args.includes('search');
        if (isSearch)
            args.remove('search');
        if (args.length <= 0) 
            return Kokoro.send(msg.channel, "❎", "Search cannot be empty");
        else if (args.length <= 1 && !isNaN(args[0]) && !isSearch) {
            Bandori.Api.getMusicByID(args[0])
                .then(music =>
                    msg.channel.send(Bandori.embedMusic(music))
                )
                .catch(error => {
                    if (error.status == 400)
                        return Kokoro.send(msg.channel, "❎", "There is no music with that ID");
                    Kokoro.throwError(msg, error);
                });
        }
        else if (isSearch) {
            Bandori.Api.getMusicByQuery(args)
                .then(music =>
                    Bandori.sendSearch(msg.author, music)
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
            Bandori.Api.getMusicByQuery(args)
                .then(music => 
                    msg.channel.send(Bandori.embedMusic(music))
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