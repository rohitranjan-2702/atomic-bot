import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ChannelType,
} from 'discord.js';
import { upsertGuildSetting, Resource } from '../../guildSettings';

export default {
  data: new SlashCommandBuilder()
    .setName('bind')
    .setDescription('Bind a resource to a channel or role')
    .addStringOption((option) =>
      option
        .setName('resource')
        .setDescription('Resource to bind')
        .setRequired(true)
        .addChoices(
          { name: 'stats_channel', value: 'stats_channel' },
          { name: 'leaderboard_channel', value: 'leaderboard_channel' },
          { name: 'admin_role', value: 'admin_role' }
        )
    )
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('Channel to bind')
        .addChannelTypes(ChannelType.GuildText)
    )
    .addRoleOption((option) =>
      option.setName('role').setDescription('Role to bind')
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const resource = interaction.options.getString(
      'resource',
      true
    ) as Resource;

    if (resource === 'admin_role') {
      const role = interaction.options.getRole('role', true);
      upsertGuildSetting(interaction.guildId!, resource, role.id);
      await interaction.reply({
        content: `Bound ${resource} to role <@&${role.id}>`,
        ephemeral: true,
      });
    } else {
      const channel = interaction.options.getChannel('channel', true);
      if (!channel || channel.type !== ChannelType.GuildText) {
        await interaction.reply({
          content: 'Please provide a text channel.',
          ephemeral: true,
        });
        return;
      }
      upsertGuildSetting(interaction.guildId!, resource, channel.id);
      await interaction.reply({
        content: `Bound ${resource} to channel <#${channel.id}>`,
        ephemeral: true,
      });
    }
  },
};
