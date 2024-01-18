module.exports = {
    name: 'messageReactionAdd',
    once: false,
    async execute(reaction, user) {
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
};
