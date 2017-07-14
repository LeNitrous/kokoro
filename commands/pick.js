function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    help: 'Choose something.',
    usage: '<item> / <item> / ...',
    ownerOnly: false,
    serverOnly: false,
    run: (client, msg, args) => {
        var i = args.join(" ").split("/");
        if (i === undefined) { return msg.channel.send('\u26A0 \u276f  Give me something to choose from.') };
        var p = getRandomInt(0, i.length - 1);
        msg.channel.send(`\uD83D\uDCCB \u276f  I pick **${i[p]}**!`);
    }
}