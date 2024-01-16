const prefix = require('../../config.json').prefix;
const badWords = require('bad-words');
let phraseFilter = new badWords({list: [
  'crud',
  'ick',
  'FREE NITRO'
]});
phraseFilter.removeWords("hell","damn")
const AntiSpam = require("discord-anti-spam");
const antiSpam = new AntiSpam({
    warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
    muteTreshold: 6, // Amount of messages sent in a row that will cause a mute.
    kickTreshold: 9000000000000000000, // Amount of messages sent in a row that will cause a kick.
    banTreshold: 9000000000000000000, // Amount of messages sent in a row that will cause a ban.
    warnMessage: "Stop spamming!", // Message sent in the channel when a user is warned.
    muteMessage: "You have been muted for spamming!", // Message sent in the channel when a user is muted.
    kickMessage: "You have been kicked for spamming!", // Message sent in the channel when a user is kicked.
    banMessage: "You have been banned for spamming!", // Message sent in the channel when a user is banned.
    unMuteTime: 15, // Time in minutes before the user will be able to send messages again.
    verbose: true, // Whether or not to log every action in the console.
    removeMessages: true, // Whether or not to remove all messages sent by the user.
    ipwarnEnabled: false, //whether to delete ip addresses in channels or not.
    //ignoredPermissions: [PermissionFlagsBits.Administrator], // If the user has the following permissions, ignore him.
    // For more options, see the documentation:
  });
module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message, client) {
        if (message.content.startsWith('p-eval')) {
            if (message.author.id === '1018171376579919883' || message.author.id === '640579687822917649') {
                const toeval = message.content.replace('p-eval', '');
                if (toeval === '') return message.reply('You must give me something to evaluate');
                try {
                    let result = eval(toeval);
                    if (typeof result !== 'string') {
                        result = require('util').inspect(result, { depth: 0 });
                    }
                } catch (err) {
                    message.reply(`There was an error\n \`\`\`${err}\`\`\``)
                }
            }
        }
        if (message.content.match(/later/i)) {
            if (message.author.id === '1018171376579919883') {
                    message.reply(`*You mean never?*`)
            }
        }
        if (message.content.match(/lazy/i)) {
            if (message.author.id === '1018171376579919883') {
                    message.reply(`*You are to lazy..*`)
            }
        }
        /*else if(message.content.startsWith(prefix)) { // i commented in code also parts of msg commands and didnt finished them
            const msg = message.content.replace(prefix,'').split(' ')
            const command = client.commands.get(msg[0])
            if(!command) return;
            try {
                await command.msgexecute(message, client);
            } catch (err) {
                console.log(err);
                message.reply('There was an error executing this command')
            }
        }*/
        flaggedMessage = false
        if (!!phraseFilter.isProfane(message)) {
            flaggedMessage = true
            flagReason = 'Banned Word detected';
        }
        if (!!message.content.match(/http(s)?\:\/\/discord\.gg/g)) {
            flaggedMessage = true
            flagReason = 'Invite Link detected';
        }
        if (flaggedMessage == true) {
            await message.delete();
            message.channel.send(`<@${message.author.id}> im sorry! Dont ruin friendly atmosphere!\nFlag reason: ${flagReason}\nFlagged by: Auto Mod`).then(repliedMessage => {
                setTimeout(() => repliedMessage.delete(), 5000);
            });
        }
        antiSpam.message(message)
    },
};
