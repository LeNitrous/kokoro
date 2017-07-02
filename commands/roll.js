function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    help: 'Rolls a dice. Specify values to determine range.',
    usage: '[Min] [Max]',
    ownerOnly: false,
    serverOnly: false,
    run: (client, msg, args) => {
        var reply = [
            'Pong!',
            'Up!',
            'Yousoro!',
            'Yes!',
            'Nico Nii!'
        ];
        var randomReply = Math.floor(Math.random()*reply.length)
        var result = typeof args[0] !== "undefined" ? getRandomInt(args[0], args[1]) : getRandomInt(1, 6);
        msg.channel.send(`\uD83C\uDFB2 | Rolled a **${result}**`)
    }
}