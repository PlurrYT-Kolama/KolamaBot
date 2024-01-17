module.exports = {
    name: 'messageReactionAdd',
    async execute(reaction, user) {

        if (user.partial) {
            try {
                await user.fetch();
                if (reaction.message.guild) {
                    if (reaction.message.id == '1197237806486011926') {
                        const member = reaction.message.guild.members.cache.get(user.id);
                    
                        if (member) console.log(member.roles);
                    }
                }
            }
            catch (error) {
                console.error(error);
            }
        }
    },
};
