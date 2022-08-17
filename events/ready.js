const EventEmitter = require('events');
const Discord = require('discord.js');
require('dotenv').config();

class discordS extends EventEmitter{

    constructor(){
        super();
        this.client = new Discord.Client();
        this.client.on('ready',this.OnDiscordReady);
        this.client.on('message',this.OnDiscordMessage);
        this.client.login(process.env.TOKEN);
    }

    OnDiscordMessage = (msg) => { //arrow function
        if(msg.author == this.client.author) return;
    }

    OnDiscordReady =() => { //arrow function
        console.log(`Discord client logged in as ${this.client.user.tag}`);
    }

}

module.exports = new discordS();