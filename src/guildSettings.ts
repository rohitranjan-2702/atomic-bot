import db from './db';

export type Resource = 'stats_channel' | 'leaderboard_channel' | 'admin_role';

export interface GuildSettings {
  guild_id: string;
  stats_channel_id?: string;
  leaderboard_channel_id?: string;
  admin_role_id?: string;
  updated_at: string;
}

export function getGuildSettings(guildId: string): GuildSettings | undefined {
  return db
    .prepare('SELECT * FROM guild_settings WHERE guild_id = ?')
    .get(guildId) as GuildSettings | undefined;
}

export function upsertGuildSetting(
  guildId: string,
  resource: Resource,
  value: string
): void {
  const column = `${resource}_id`;
  const stmt = db.prepare(
    `INSERT INTO guild_settings (guild_id, ${column}) VALUES (?, ?) ON CONFLICT(guild_id) DO UPDATE SET ${column}=excluded.${column}, updated_at=CURRENT_TIMESTAMP`
  );
  stmt.run(guildId, value);
}
