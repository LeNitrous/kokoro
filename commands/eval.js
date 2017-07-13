const log   = require('../utils/Logger.js');

function clean(text) {
  if (typeof(text) === 'string')
    return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
  else
      return text;
};

module.exports = {
    help: 'Evaluate Javascript code.',
    usage: '<code>',
    ownerOnly: true,
    run: (client, msg, args) => {
        try {
            const input = args.join(' ');
            let code = eval(input);

            if (typeof code !== 'string')
                code = require('util').inspect(code);
            
            msg.channel.send(clean(code), {code: 'xl'});
            log.warn(code, 'EVAL')
        } catch (err) {
            msg.channel.send(clean(err), {code: 'xl'});
            log.error(err);
        };
    }
};