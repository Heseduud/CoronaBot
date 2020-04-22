const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
  name: 'confirmed',
  description: 'Corona query, confirmed cases by country',
  async execute(message, args) {
    console.log(args[0]);
    console.log('confirmed by country command');
    // const query = args;
    const date = new Date();

    date.setDate(date.getDate() - 1);

    const dateISO = `${date.toISOString().substring(0, 11)}00:00:00Z`;
    console.log(dateISO);

    const reqURL = `https://api.covid19api.com/live/country/${args[0]}/status/confirmed/date/${dateISO}`;

    const res = await fetch(reqURL).then((response) => response.json());
    console.log(res);

    const data = res[0];

    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`COVID-19 cases in ${data.Country}`)
      .setURL(reqURL)
      .addFields(
        { name: 'Confirmed', value: `${data.Confirmed}`, inline: true },
        { name: 'Deaths', value: `${data.Deaths}`, inline: true },
        { name: 'Recovered', value: `${data.Recovered}`, inline: true },
        { name: 'Active', value: `${data.Active}`, inline: true },
      )
      .setFooter('CoronaBot © Heseduud');

    message.channel.send(embed);
  },
};
