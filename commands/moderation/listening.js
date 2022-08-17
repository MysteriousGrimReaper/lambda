const Discord = require('discord.js')
const client = new Discord.Client();
module.exports = {
	name: 'listening',
	description: 'listening',
	guildOnly: true,
	permissions: 'KICK_MEMBERS',
	execute(message, args) {
		client.user.setActivity(`${args[0]}`, { type: 'LISTENING' });
	},
};