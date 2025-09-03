import 'dotenv/config';
import { z } from 'zod';

const configSchema = z.object({
  DISCORD_TOKEN: z.string(),
  DISCORD_CLIENT_ID: z.string(),
});

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is required but not set.`);
  }
  return value;
}

const config = configSchema.parse({
  DISCORD_TOKEN: getEnv('DISCORD_TOKEN'),
  DISCORD_CLIENT_ID: getEnv('DISCORD_CLIENT_ID'),
});

export default config;
