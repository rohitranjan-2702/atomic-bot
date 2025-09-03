import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { getGuildSettings } from '../../guildSettings';

export default {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Show current bindings'),
  async execute(interaction: ChatInputCommandInteraction) {
    const settings = getGuildSettings(interaction.guildId!);
    if (!settings) {
      await interaction.reply({
        content: 'No bindings set for this guild.',
        ephemeral: true,
      });
      return;
    }

    const lines = [
      `stats_channel: ${settings.stats_channel_id ? `<#${settings.stats_channel_id}>` : '❌ not set'}`,
      `leaderboard_channel: ${settings.leaderboard_channel_id ? `<#${settings.leaderboard_channel_id}>` : '❌ not set'}`,
      `admin_role: ${settings.admin_role_id ? `<@&${settings.admin_role_id}>` : '❌ not set'}`,
    ];

    await interaction.reply({ content: lines.join('\n'), ephemeral: true });
  },
};
