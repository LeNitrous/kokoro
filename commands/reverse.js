function reverse(s){
    return s.split("").reverse().join("");
}

module.exports = {
    help: '!txet sesreveR',
    usage: '<text>',
    run: (client, msg, args) => {
        var text = args.join(" ");
        msg.channel.send(reverse(text));
    }
}