module.exports = {
    name: "BanG Dream! Database Bot Cache",
    desc: "Clear bot\'s cached data",
    help: 'Clear bot\'s cached data.',
    preq: ["BotOwnerOnly"],
    task: (Kokoro, msg, args) => {
        Kokoro.settings.set("cache", settings);
    }
};

var settings = {
    events: {
        en: null,
        jp: null,
        tw: null,
        kr: null
    }
}