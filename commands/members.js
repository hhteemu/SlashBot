const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("members")
    .setDescription("Fetch server member names"),
  
  async execute(interaction) {
    const guild = interaction.guild;
    await guild.members.fetch();
    const memberUsernames = [...guild.members.cache.values()].map(m => m.user.username);
    await interaction.reply(`Server members: ${memberUsernames.join(", ")}`);
  }
}