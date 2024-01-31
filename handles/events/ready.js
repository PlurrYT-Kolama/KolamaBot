const fs = require('fs');
const { ActivityType } = require('discord.js')
const {ThreadManager} = require('discord-tickets');
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        let sCount = client.guilds.cache.size
        ascii = `   ____        _                        _       \n  | __ )  ___ | |_   _ __ ___  __ _  __| |_   _ \n  |  _ \\ / _ \\| __| | '__/ _ \\/ _' |/ _' | | | |\n  | |_) | (_) | |_  | | |  __/ (_| | (_| | |_| |\n  |____/ \\___/ \\__| |_|  \\___|\\__,_|\\__,_|\\__, |\n                                          |___/ `
        console.log(`Logged in as ${client.user.tag}\nThis bot is in ${sCount} servers\n${ascii}\n\n`)
        console.log(client.user.id)
        client.user.setActivity(gconfig.status, { type: ActivityType.Watching })
        client.ticketManager = new ThreadManager(client, {
            enabled: true,
            channelId: gconfig.ticketID,
            staffRole: gconfig.staffAccessRoleID,
            storage: `../../../tickets.json`,
            ticketCache: true
        });
        if (client.test) {
            process.exit(0)
        }
        setInterval(function () {
            fs.writeFileSync('./times.json', '{\n    "Words": "of wisdom"\n}', 'utf-8')
        }, 86400000)
    },
};
