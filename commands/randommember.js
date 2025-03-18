const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("randommember")
    .setDescription("Selects a random member from the server"),

    async execute(interaction) {
      const guild = interaction.guild;
      await guild.members.fetch();
      const memberArray = guild.members.cache.filter(m => !m.user.bot).map(m => m.user);
    
      if (memberArray.length === 0){
        return interaction.reply("No members found!");
      }

      const randomMember = memberArray[Math.floor(Math.random() * memberArray.length)];
      await interaction.reply(`You have been chosen ${randomMember.username}!`);
    }
}