import Database, { type Database as SQLiteDatabase } from 'better-sqlite3';
import { join } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';

function initializeDatabase(): SQLiteDatabase {
  try {
    const DB_DIR = join(process.cwd(), 'data');
    if (!existsSync(DB_DIR)) {
      mkdirSync(DB_DIR, { recursive: true });
    }

    const db = new Database(join(DB_DIR, 'bot.db'));

    // Run initial migration (idempotent)
    db.exec(`
  CREATE TABLE IF NOT EXISTS guild_settings (
    guild_id TEXT PRIMARY KEY,
    stats_channel_id TEXT,
    leaderboard_channel_id TEXT,
    admin_role_id TEXT,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

    return db;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

const db: SQLiteDatabase = initializeDatabase();

export default db;
