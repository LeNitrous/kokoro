const reqBuff = require('request').defaults({encoding: null});

var Canvas = require('canvas'),
    Image  = Canvas.Image,
    canvas = new Canvas(512, 512),
    ctx    = canvas.getContext('2d');

var blocks = {
    '0': ':zero:',
    '1': ':one:',
    '2': ':two:',
    '3': ':three:',
    '4': ':four:',
    '5': ':five:',
    '6': ':six:',
    '7': ':seven:',
    '8': ':eight:',
    '9': ':nine:',
    'a': '\uD83C\uDDE6',
    'b': '\uD83C\uDDE7',
    'c': '\uD83C\uDDE8',
    'd': '\uD83C\uDDE9',
    'e': '\uD83C\uDDEA',
    'f': '\uD83C\uDDEB',
    'g': '\uD83C\uDDEC',
    'h': '\uD83C\uDDED',
    'i': '\uD83C\uDDEE',
    'j': '\uD83C\uDDEF',
    'k': '\uD83C\uDDF0',
    'l': '\uD83C\uDDF1',
    'm': '\uD83C\uDDF2',
    'n': '\uD83C\uDDF3',
    'o': '\uD83C\uDDF4',
    'p': '\uD83C\uDDF5',
    'q': '\uD83C\uDDF6',
    'r': '\uD83C\uDDF7',
    's': '\uD83C\uDDF8',
    't': '\uD83C\uDDF9',
    'u': '\uD83C\uDDFA',
    'v': '\uD83C\uDDFB',
    'w': '\uD83C\uDDFC',
    'x': '\uD83C\uDDFD',
    'y': '\uD83C\uDDFE',
    'z': '\uD83C\uDDFF',
    '!': ':exclamation:',
    '?': ':question:',
    '#': ':hash:',
    '*': ':asterisk:',
    ' ': '\xa0\xa0\xa0'
};

function blockify(string) {
    var s = string.toLowerCase().replace(/[^0-9a-z!?#* *]/gi, '').split('');
    var r = [];
    s.forEach(l => {
        r.push(blocks[l]);
    });
    return r.join(' ');
}

module.exports = {
    help: 'BLOCKIFY TEXT',
    usage: `<text>`,
    run: (client, msg, args) => {
        if (!args[0])
            return msg.channel.send('\u26A0 \u276f  Invalid argument.');
        if (args[0].match(/<:[\w]+:[\d]+>/g)) {
            msg.channel.startTyping();
            var emoji_id = args[0].match(/[0-9]/g).join("");
            var emoji = client.emojis.find('id', emoji_id);
            var enlarged = new Image;
            if (emoji.url == null) { return msg.channel.send('\u26A0 \u276f I can\'t find that emoji.') };
            reqBuff.get(emoji.url, (err, res, body) => {
                enlarged.onload = () => { };
                enlarged.src = body;
                ctx.drawImage(enlarged, 0, 0, 512, 512);
                msg.channel.send(``, {files: [{attachment: canvas.toBuffer(), name: `${emoji.name}_enlarged.jpg`}]});
                msg.channel.stopTyping();
                ctx.clearRect(0, 0, canvas.width, canvas.height)
            });
            return;
        };
        var text = args.join(" ");
        msg.channel.send(blockify(text));
    }
}