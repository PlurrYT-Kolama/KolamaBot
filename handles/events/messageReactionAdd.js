/*module.exports = {
    name: 'messageReactionAdd',
    once: false,
    async execute(reaction, user) {
            console.log("test #1")
            const message = !reaction.message.partial ? reaction.message : await reaction.message.fetch();
            try {
                    const messageId = reaction.message.id;
                    const reactionId = reaction.emoji.id;
                    const reactionName = reaction.emoji.name;
                    const member = reaction.message.guild.members.cache.get(user.id);
                    //if (!member) {
                     //   return;
                    //}
                    //if (member) 
                    console.log(member.roles);
            }
            catch (error) {
                console.log(error);
            }
    },
}; */
module.exports = {
    name: 'messageReactionAdd',
    once: false,
    async execute(reaction, user)  {
            const member = reaction.message.guild.members.fetch(user.id)
            if (reaction.partial) {
                // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
                try {
                    await reaction.fetch();
                } catch (error) {
                    console.error('Something went wrong when fetching the message: ', error);
                    // Return as `reaction.message.author` may be undefined/null
                    return;
                }
            }
            // Now the message has been cached and is fully available
            if(reaction.message.id === '1197237806486011926'){
                //const role = reaction.message.guild.roles.cache.find(r => r.name === '🔔')
                console.log(reaction._emoji.name)
                if(reaction._emoji.name === '🔔'){
                    //member.roles.add(role.id)
                    console.log(test)
                }
            }/*else if(reaction.name === '🔎'){
                us
            }*/
        //reaction.users.remove(user.id)
        }
    };
};
