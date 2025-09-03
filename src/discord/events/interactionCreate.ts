/* eslint-disable @typescript-eslint/no-explicit-any */
import { Events, Interaction } from 'discord.js';
import { Command } from '../loader';

export default {
  name: Events.InteractionCreate,
  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;
    const command = (interaction.client as any).commands?.get(
      interaction.commandName
    ) as Command | undefined;
    if (!command) {
      await interaction.reply({ content: 'Unknown command.', ephemeral: true });
      return;
    }
    try {
      await command.execute(interaction);
    } catch (err) {
      console.error('Error executing command:', err);
      if (interaction.deferred || interaction.replied) {
        await interaction.followUp({
          content: 'There was an error executing this command.',
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: 'There was an error executing this command.',
          ephemeral: true,
        });
      }
    }
  },
};
