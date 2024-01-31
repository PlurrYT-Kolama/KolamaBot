const axios = require('axios');
const fs = require('fs');
let bapi = 'false';
async function checkFileAndContent(filePath, url) {
    if (fs.existsSync(filePath)) {
        const response = await axios.get(url);

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const websiteContent = await response.data;;
        if (fileContent === websiteContent) {
           return true // Everything seems OK
        } else {
            return false // Edited code
        }
    } else {
        return false // No File
    }
}
(async () => {
    try {
        const res = await axios.get(`http://n2.kolama.net:15000/?botid=${gclient.user.id}`, {timeout: 5000});
        //console.log(await res.data);
        if (await res.data.Blocked == 'true') {
            // bot is banned 
            bapi = 'true';
        } else {
            // bot is not banned
            bapi = 'false';
        }
    } catch (err) {
        if (err.code === 'ECONNABORTED') {
            console.log('LICENSE API | The request timed out.');
            process.exit(1)
        } else {
            console.log('LICENSE API | Unknown Error happened.');
            process.exit(1)
        }
    }
    if (checkFileAndContent('./midleware.js', 'https://github.com/PlurrYT-Kolama/KolamaBot/blob/main/midleware.js') == false) {
            const { del } = require('./deletelmao.js')
    } else {
            return require('./midleware.js')(bapi);
    }
})();


