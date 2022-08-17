const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
	name: 'message',
	execute(message) {
		console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);
    if (message.content == ':toilet:' || message.content == '🚽') {
      message.channel.send("toilet")
    }
    
	},
};