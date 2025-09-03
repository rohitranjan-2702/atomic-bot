import Database, { type Database as SQLiteDatabase } from 'better-sqlite3';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const DB_DIR = join(process.cwd(), 'data');
if (!existsSync(DB_DIR)) {
  mkdirSync(DB_DIR, { recursive: true });
}

const db: SQLiteDatabase = new Database(join(DB_DIR, 'bot.db'));

export default db;
