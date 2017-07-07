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
    ' ': ':black_large_square:'
};

function blockify(string) {
    var s = string.toLowerCase().replace(/[^0-9a-z!?#*]/gi, '').split('');
    var r = [];
    s.forEach(l => {
        r.push(blocks[l]);
    });
    return r.join(' ');
}

module.exports = {
    help: 'BLOCKIFY TEXT',
    usage: `<Text>`,
    run: (client, msg, args) => {
        if (!args[0])
            return msg.channel.send('No arguments passed.');
        var text = args.join(" ");
        msg.channel.send(blockify(text));
    }
}