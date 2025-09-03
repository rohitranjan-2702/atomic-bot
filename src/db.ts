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
  
`);

    return db;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

const db: SQLiteDatabase = initializeDatabase();

export default db;
