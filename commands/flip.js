// Credits to: https://gist.github.com/jasny/9807617

function flipString(aString) {
 var last = aString.length - 1;
 var result = new Array(aString.length)
 for (var i = last; i >= 0; --i) {
  var c = aString.charAt(i)
  var r = flipTable[c]
  result[last - i] = r != undefined ? r : c
 }
 return result.join('')
};

var flipTable = {
a : '\u0250',
b : 'q',
c : '\u0254', 
d : 'p',
e : '\u01DD',
f : '\u025F', 
g : '\u0183',
h : '\u0265',
i : '\u0131', 
j : '\u027E',
k : '\u029E',
//l : '\u0283',
m : '\u026F',
n : 'u',
r : '\u0279',
t : '\u0287',
v : '\u028C',
w : '\u028D',
y : '\u028E',
'.' : '\u02D9',
'[' : ']',
'(' : ')',
'{' : '}',
'?' : '\u00BF',
'!' : '\u00A1',
"\'" : ',',
'<' : '>',
'_' : '\u203E',
';' : '\u061B',
'\u203F' : '\u2040',
'\u2045' : '\u2046',
'\u2234' : '\u2235',
'\r' : '\n'
};

module.exports = {
    help: 'Flips text upside down!',
    usage: '<Text>',
    run: (client, msg, args) => {
        var text = args.join(" ");
        msg.channel.send(flipString(text));
    }
};