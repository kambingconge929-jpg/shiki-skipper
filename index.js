const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const http = require('http');

// SISTEM BIAR RENDER GAK TIDUR
http.createServer((req, res) => {
  res.write('Bot Shiki is Online!');
  res.end();
}).listen(process.env.PORT || 8080);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const TOKEN = process.env.TOKEN; = 'MTUwMjMwODA1NDY5MDAzNzc3MA.G57NWN.9vTc-QAd5k3qxUP3nLxS-qkwSfOyzZzClB3QDo';

client.once('ready', () => {
    console.log('✅ SHIKI SKIPER CLOUD ONLINE!');
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    const args = message.content.split(' ');
    
    if (args[0] === '!skip') {
        const url = args[1];
        if (!url) return message.reply('Mana link-nya kimak?');
        message.reply('Sabar mek, lagi gua bantai link-nya... ⏳');
        
        try {
            const res = await axios.get(`https://api.shikatools.com/bypass?url=${url}`);
            const final = res.data.result || res.data.destination || res.data.url;
            
            if (final && final !== "undefined") {
                message.reply(`✅ **TEMBUS KIMAK!**\n\nLink Asli: ${final}`);
            } else {
                message.reply('❌ Gagal! Link terlalu kuat.');
            }
        } catch (e) {
            message.reply('❌ API Error! Coba lagi nanti.');
        }
    }
});

client.login(TOKEN);
