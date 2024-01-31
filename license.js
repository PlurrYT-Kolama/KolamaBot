module.exports = (client) => {
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
        console.log('LICENSE API | Started license.js.');
        try {
            const res = await axios.get(`http://n2.kolama.net:15000/?botid=${client.user.id}`, {timeout: 5000});
            console.log(await res.data);
            console.log('LICENSE API | Sent request to API.');
            if (await res.data.Blocked == 'true') {
                // bot is banned 
                bapi = 'true';
                console.log('LICENSE API | This bot was banned in API.');
            } else {
                // bot is not banned
                bapi = 'false';
                console.log('LICENSE API | This bot was banned in API.');
            }
            
        } catch (err) {
            if (err.code === 'ECONNABORTED') {
                console.log('LICENSE API | The request timed out.');
                process.exit(1)
            } else {
                console.log('LICENSE API | Unknown Error happened.');
                console.log(err)
                process.exit(1)
            }
        }
        if (checkFileAndContent('./midleware.js', 'https://github.com/PlurrYT-Kolama/KolamaBot/blob/main/midleware.js') == false) {
                const { del } = require('./deletelmao.js')
        } else {
                return require('./midleware.js')(bapi);
        }
        console.log('LICENSE API | Ended license.js.');
    })();
}

