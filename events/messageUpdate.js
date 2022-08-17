module.exports = {
	name: 'messageUpdate',
	execute(oldMessage, newMessage, client) {
		console.log(`${oldMessage.author.tag} in #${oldMessage.channel.name} updated their message from: ${oldMessage.content} to ${newMessage.content}`);
	},
};