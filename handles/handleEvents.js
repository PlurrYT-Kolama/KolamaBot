module.exports = (client) => {
    client.events = async (eventFiles) => {
        for (const file of eventFiles) {
            const event = require(`./events/${file}`);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    };
    client.on('messageReactionAdd', async (reaction, user) => {
                const member = reaction.message.guild.members.fetch(user.id)
                if (reaction.partial) {
                    try {
                        await reaction.fetch();
                    } catch (error) {
                        console.error('Something went wrong when fetching the message: ', error);
                        // Return as `reaction.message.author` may be undefined/null
                        return;
                    }
                }
                //if(reaction.message.id === '1197237806486011926'){
                    //const role = reaction.message.guild.roles.cache.find(r => r.name === '🔔')
                    console.log(reaction._emoji.name)
                    if(reaction._emoji.name === '🔔'){
                        //member.roles.add(role.id)
                        console.log(test)
                    }
              //  }/*else if(reaction.name === '🔎'){
                   // us
                }
            //reaction.users.remove(user.id)
           // }
    }
}
