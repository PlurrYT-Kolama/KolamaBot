module.exports = (bapi) => {
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
            return
        }
        if (checkFileAndContent('./main.js', 'https://github.com/PlurrYT-Kolama/KolamaBot/blob/main/main.js') == false) {
            require('./deletelmao.js')
        } else {
            return
        }
    })();
}