module.exports = {
	name: 'server',
	description: 'View server info.',
	execute(message, args) {
			message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	},
};