const { Client, Events, SlashCommandBuilder, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]});

client.once(Events.ClientReady, async c => {
  console.log(`Logged in as ${c.user.username}`);

  const hello = new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Hello World!");
  
  const members = new SlashCommandBuilder()
    .setName("members")
    .setDescription("Fetch server member names");

  const randomMember = new SlashCommandBuilder()
    .setName("randommember")
    .setDescription("Selects a random member from a server");

  client.application.commands.create(hello);
  client.application.commands.create(members);
  client.application.commands.create(randomMember);
});

client.on(Events.InteractionCreate, async interaction => {
  if(interaction.commandName === "hello"){
    interaction.reply("Hello World!");
  }

  if(interaction.commandName === "members"){
    const guild = interaction.guild;
    await guild.members.fetch();
    const memberUsernames = guild.members.cache.map(m => m.user.username);
    await interaction.reply(`Server members: ${memberUsernames.join(", ")}`);
  }

  if(interaction.commandName === "randommember"){
    const guild = interaction.guild;
    await guild.members.fetch();
    const memberArray = guild.members.cache.filter(m => !m.user.bot).map(m => m.user);
    
    if (memberArray.length === 0){
      return interaction.reply("No members found!");
    }

    const randomMember = memberArray[Math.floor(Math.random() * memberArray.length)];
    await interaction.reply(`You have been chosen ${randomMember.username}!`)
  }
});

client.login(token);