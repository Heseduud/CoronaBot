const fetch = require('node-fetch');
const Discord = require('discord.js');
const _ = require('lodash');

const capitalize = (string) => {
  if (typeof string !== 'string') return '';
  return string.charAt(0).toUpperCase + string.slice(1);
};

module.exports = {
  name: 'confirmed',
  description: 'Corona query, confirmed cases by country',
  async execute(message, args) {
    console.log(args[0]);
    console.log('confirmed by country command');
    let country = args[0].toLowerCase();

    // TODO: find corner-cases for country names other than USA
    if (args[0] === 'USA' || args[0] === 'America') { country = 'united-states'; }
    const date = new Date();

    date.setDate(date.getDate() - 1);

    const dateISO = `${date.toISOString().substring(0, 11)}00:00:00Z`;
    console.log(dateISO);

    const reqURL = `https://api.covid19api.com/live/country/${country}/status/confirmed/date/${dateISO}`;

    const res = await fetch(reqURL).then((response) => response.json());
    console.log(res);

    let data = res[0];

    // Corner case for USA
    if (res.length > 1) {
      console.log('went into foreach loop');
      const newData = {
        Confirmed: 0,
        Deaths: 0,
        Recovered: 0,
        Active: 0,
      };

      _.forEach(res, (value) => {
        newData.Confirmed += value.Confirmed;
        newData.Deaths += value.Deaths;
        newData.Recovered += value.Recovered;
        newData.Active += value.Active;
      });

      data = newData;
    }

    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`COVID-19 cases in ${capitalize(country)}`)
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
