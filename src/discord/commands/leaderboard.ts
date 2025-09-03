import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { getGuildSettings } from '../../guildSettings';

export default {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Post the leaderboard'),
  async execute(interaction: ChatInputCommandInteraction) {
    const settings = getGuildSettings(interaction.guildId!);
    if (!settings?.leaderboard_channel_id) {
      await interaction.reply({
        content: 'No leaderboard_channel bound. Ask an admin to /bind first.',
        ephemeral: true,
      });
      return;
    }
    const channel = await interaction
      .guild!.channels.fetch(settings.leaderboard_channel_id)
      .catch(() => null);
    if (!channel || !channel.isTextBased()) {
      await interaction.reply({
        content:
          'Bound channel is missing. Ask an admin to update the binding.',
        ephemeral: true,
      });
      return;
    }

    const leaderboardText =
      '**Leaderboard**\n1. <@1234567890> – 100 pts\n2. <@0987654321> – 80 pts';
    await channel.send(leaderboardText);
    await interaction.reply({
      content: 'Leaderboard posted!',
      ephemeral: true,
    });
  },
};
