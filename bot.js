require('dotenv').config();

const axios = require('axios');
const {Client, GatewayIntentBits, EmbedBuilder} = require("discord.js");
const Discord = require("discord.js");
const client = new Client({intents:[GatewayIntentBits.Guilds, 
                                    GatewayIntentBits.GuildMessages, 
                                    GatewayIntentBits.MessageContent,
                                    GatewayIntentBits.GuildMessageReactions, 
                                    GatewayIntentBits.GuildMembers, 
                                    GatewayIntentBits.GuildMessageTyping
]});

//prefix for the bot to use
const prefix = "/";

// message to log when bot is ready for useage
client.once("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
});

const listTruth = [
    "What was your biggest childhood fear?",
    "What is the worst grade you received for a class in school/college?",
    "What is the biggest lie you’ve ever told?",
    "What is the worst physical pain you’ve ever been in?",
    "What sport or hobby do you wish you would’ve picked up as a child?"
]

const listDare = [
    "Hold the plank position until it’s your turn again.",
    "Show off your best dance moves for the full duration of a song.",
    "Show the group your internet search history.",
    "How old are you? Whatever your age is, do that many squats.",
    "Let another player draw a washable marker mustache on you."
]

const suggestions = [];
client.on("messageCreate", (message) =>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // command to roll a random dice number from 1-6
    if (command == "roll"){
        //math logic
        const randomNumber = Math.floor(Math.random()*6) + 1;
        message.reply(`You have rolled number ${randomNumber}`);
    }

    // the truth command for Truth and Dare game
    if (command == "truth"){
        //select a random question from listTruth array
        const randomTruth = listTruth[Math.floor(Math.random() * listTruth.length)];
        message.reply(randomTruth);
    }

    // the dare command for Truth and Dare game
    if (command == "dare"){
        const randomDare = listDare[Math.floor(Math.random() * listDare.length)];
        message.reply(randomDare);
    }

    if (command === "suggest"){
        const suggestion = args.join(" ");
        if(!suggestion){
            message.reply(`${client.user.tag} Please add a suggestion by using the right format!`);
            return;
        }

        //embed display the suggestion to discord:
        const suggestionDisplay = new Discord.EmbedBuilder()
        .setColor('#ae70ff')
        .setAuthor(message.author.tag, message.author.displayAvatarURL()) // error fix
        .setDescription(suggestion)
        .setThumbnail(client.user.displayAvatarURL) //small image of the bots logo
        .addField("Thumbs Up 👍", "0", true)
        .addField("Thumbs Down 👎", "0", true)
        .setTimestamp(Date.now())

        message.channel.send({ embeds: [suggestionDisplay] }).then(sendEmbed =>{
            sendEmbed.react("👍");
            sendEmbed.react("👎");

            suggestions.push({embed: sendEmbed, author: message.author.id });

        }).catch(console.error);
    }
});

client.login(process.env.DISCORD_BOT_ID);