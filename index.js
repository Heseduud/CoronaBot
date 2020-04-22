const Discord = require('discord.js');
const { token } = require('./config.json');

const client = new Discord.Client();
client.once('ready', () => {
  console.log('ready');
});

client.on('message', (message) => {
  if (message.content === '!ping') {
    message.channel.send('Pong.');
  }
});

client.login(token);
