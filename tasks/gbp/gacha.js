const Bandori = require("../../mods/BandoriHandler.js");

module.exports = {
    name: "BanG Dream! Gacha",
    desc: "Gacha Simulator",
    help: "Free gacha simulation",
    args: [
        {name: "stars", desc: 'How many stars to spend (min: 250 / max: 2500). Spending 2500 stars guarantees a 3★'},
    ],
    task: (Kokoro, msg, args) => {
        var guaranteed = false;
        var obtained = [];
        var stars = args.shift();
        var get = 0;
        var table = [
            {item: 4, weight: 1},
            {item: 3, weight: 9},
            {item: 2, weight: 80}
        ];
        var lootTable = generateLootTable(table);
        if (stars > 2500)
            return Kokoro.send(msg.channel, "", "You can't spend more than <:star:406381350648807425> **2500x**");
        if (stars < 250 || isNaN(stars))
            return Kokoro.send(msg.channel, "", "You need to spend at least <:star:406381350648807425> **250x**");
        if (stars == 2500)
            guaranteed = true;
        get = Math.floor(stars / 250);
        if (guaranteed) {
            get -= 1;
            for (var i = 0; i < get; i++) {
                obtained.push(lootTable[getRandomInt(lootTable.length)]);
            }
            obtained.push(3);
        }
        else {
            for (var i = 0; i < get; i++) {
                obtained.push(lootTable[getRandomInt(lootTable.length)]);
            }
        }
        Bandori.Api.getCards()
            .then(cards => {
                var obtainedCards = [];
                var obtainedCardList = [];
                var cardTable = {
                    4: [],
                    3: [],
                    2: [],
                    1: []
                }
                cards.forEach(item => {
                    cardTable[item.rarity].push(item);
                });
                for (var i = 0; i < obtained.length; i++) {
                    obtainedCards.push(cardTable[obtained[i]][getRandomInt(cardTable[obtained[i]].length)]);
                }
                obtainedCards.forEach(card => {
                    obtainedCardList.push(`#${card.id.toString().padStart(3, "0")} > ${card.toString()}`);
                });
                msg.channel.send(`${msg.author.toString()}, you spent <:star:406381350648807425> **${stars}x** for your gacha and got:`);
                msg.channel.send(obtainedCardList.join('\n'), {code: "md"});
            })
            .catch(error => {
                Kokoro.throwError(msg, error);
            });
    }
};

function generateLootTable(table) {
    var NEW_TABLE = [];
    table.forEach(item => {
        for (var i = 0; i < item.weight; i++) {
            NEW_TABLE.push(item.item)
        }
    });
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    return shuffle(NEW_TABLE);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}