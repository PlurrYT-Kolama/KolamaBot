module.exports = (bapi) => {
    console.log('LICENSE MIDLEWARE | Started Midleware.');
    const axios = require('axios');
    const fs = require('fs');
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
    // Use the function
    (async () => {
        if (checkFileAndContent('./license.js', 'https://github.com/PlurrYT-Kolama/KolamaBot/blob/main/license.js') == false) {
            require('./deletelmao.js')
        } else {
            return console.log('LICENSE MIDLEWARE | Midleware passed.');
        }
        if (checkFileAndContent('./main.js', 'https://github.com/PlurrYT-Kolama/KolamaBot/blob/main/main.js') == false) {
            require('./deletelmao.js')
        } else {
            return console.log('LICENSE MIDLEWARE | Midleware passed.');
        }
    })();
    console.log('LICENSE MIDLEWARE | Ended Midleware.');
}
