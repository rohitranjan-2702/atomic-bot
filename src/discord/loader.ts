/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client, Collection, Events } from 'discord.js';
import { readdirSync } from 'node:fs';
import { join } from 'path';

export type Command = {
  data: import('discord.js').SlashCommandBuilder;
  execute: (
    interaction: import('discord.js').ChatInputCommandInteraction
  ) => Promise<void>;
};

export default async function load(client: Client): Promise<void> {
  // Dynamically load commands
  const commands = new Collection<string, Command>();
  const commandsPath = join(__dirname, 'commands');
  for (const file of readdirSync(commandsPath).filter(
    (f) => f.endsWith('.ts') || f.endsWith('.js')
  )) {
    const command: Command = (await import(join(commandsPath, file))).default;
    commands.set(command.data.name, command);
  }
  // @ts-expect-error augmenting at runtime
  client.commands = commands;

  // Dynamically load events
  const eventsPath = join(__dirname, 'events');
  for (const file of readdirSync(eventsPath).filter(
    (f) => f.endsWith('.ts') || f.endsWith('.js')
  )) {
    const eventModule = await import(join(eventsPath, file));
    const event = eventModule.default ?? eventModule;
    if (event.once) {
      client.once(event.name, (...args: any[]) => event.execute(...args));
    } else {
      client.on(event.name, (...args: any[]) => event.execute(...args));
    }
  }

  // Register slash commands once the bot is ready
  client.once(Events.ClientReady, async (readyClient) => {
    try {
      await readyClient.application?.commands.set(commands.map((c) => c.data));
      console.log(`Registered ${commands.size} slash commands globally`);
    } catch (err) {
      console.error('Failed to register slash commands:', err);
    }
  });
}
