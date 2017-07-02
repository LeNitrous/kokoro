const fs 	  = require('fs'),
      util    = require('../utils/utils.js'),
      log     = require('../utils/Logger.js'),
      config  = require('../config.json');

module.exports = {
    help: 'Reload a module.',
    usage: '<Module>',
    ownerOnly: true,
    run: (client, msg, args) => {
        if (args[0] == 'reload') {msg.channel.send('\uD83D\uDED1 | You can\'t reload this module.'); return;}
        var m = args.length > 1 ? args.join('/') : args[0];
        try {
        delete require.cache[require.resolve(`./${m}.js`)];
        msg.channel.send(`\u2139 | Module \`${m}\` has been reloaded`);
        log.info2(`Reloaded: ${m}.js`);
        } catch (err){
            util.sendcmdhelp(msg, 'reload', config.prefix, module.exports.help, module.exports.usage)
        }
    }
}