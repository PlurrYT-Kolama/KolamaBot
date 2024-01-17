module.exports = {
    name: 'messageReactionAdd',
    async execute(reaction, user) {
            try {
                if (reaction.message.guild) {
                    const messageId = reaction.message.id;
                    const reactionId = reaction.emoji.id;
                    const reactionName = reaction.emoji.name;
                    if (messageId == '1197237806486011926') {
                        const member = reaction.message.guild.members.cache.get(user.id);
                        if (!member) {
                            return;
                        }
                        if (member) console.log(member.roles);
                    }
                }
            }
            catch (error) {
                console.error(error);
            }
    },
};
