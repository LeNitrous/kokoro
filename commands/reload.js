const fs 	  = require('fs'),
      util    = require('../utils/utils.js'),
      log     = require('../utils/Logger.js'),
      config  = require('../config.json');

module.exports = {
    help: 'Reload a command.',
    usage: '<command>',
    ownerOnly: true,
    run: (client, msg, args) => {
        if (args[0] == 'reload') {msg.channel.send('\u26A0 \u276f  You can\'t reload this module.'); return;}
        var m = args.length > 1 ? args.join('/') : args[0];
        try {
        delete require.cache[require.resolve(`./${m}.js`)];
        msg.channel.send(`\u2139 \u276f  Module \`${m}\` has been reloaded`);
        log.info2(`Reloaded: ${m}.js`);
        } catch (err){
            msg.channel.send('\u26A0 \u276f  That is not a valid command.');
        }
    }
}