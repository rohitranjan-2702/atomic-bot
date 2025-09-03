import { Client, Events, GatewayIntentBits } from 'discord.js';
import config from './config';
import load from './discord/loader';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
load(client);

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(config.DISCORD_TOKEN);

export default client;
