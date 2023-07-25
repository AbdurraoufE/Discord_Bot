require('dotenv').config();

const axios = require('axios');
const {Client, GatewayIntentBits} = require("discord.js");
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

//prefix for the bot to use
const prefix = "/";

// message to log when bot is ready for useage
client.once("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) =>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // command to roll a random dice number from 1-6
    if (command == "roll"){
        const randomNumber = Math.floor(Math.random()*6) + 1;
        message.reply("You have rolled number" `${randomNumber}`);
    }

    // the truth command for Truth and Dare game
    if (command == "truth"){
        message.reply("What is a weird food that you love?");
    }

    // the dare command for Truth and Dare game
    if (command == "dare"){
        message.reply("Do as many push-ups as you can in one minute");
    }
});

client.login(process.env.DISCORD_BOT_ID);