import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { getGuildSettings } from '../../guildSettings';

export default {
  data: new SlashCommandBuilder()
    .setName('ping-stats')
    .setDescription('Ping the stats channel with pong'),
  async execute(interaction: ChatInputCommandInteraction) {
    const settings = getGuildSettings(interaction.guildId!);
    if (!settings?.stats_channel_id) {
      await interaction.reply({
        content: 'No stats_channel bound.',
        ephemeral: true,
      });
      return;
    }
    const channel = await interaction
      .guild!.channels.fetch(settings.stats_channel_id)
      .catch(() => null);
    if (channel && channel.isTextBased()) {
      await channel.send('pong');
      await interaction.reply({ content: 'Pong sent!', ephemeral: true });
    } else {
      await interaction.reply({
        content: 'Stats channel missing.',
        ephemeral: true,
      });
    }
  },
};
