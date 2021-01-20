# CoronaBot
CoronaBot - discord bot for getting info about covid-19 
(i'm not sure if it works anymore, just using it as an example project for devops course)

Using covid19api for data : https://covid19api.com/  
Made using node.js and discord.js as a module for Discord : https://discord.js.org

## Installation
First, make sure you have Node.js installed.
Run `npm install` to install dependency packages.

You'll need to get an API token from the discord [website](https://discordapp.com/developers/applications/) to run the app.
After getting the token, create a file called `config.json` in the root directory with the following content:
```
{
    "prefix": "<YOUR_BOT_PREFIX_HERE>",
    "token": "<YOUR_API_TOKEN_HERE>"
} 
```

The app will start running with `npm start`
