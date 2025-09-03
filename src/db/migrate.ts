import db from './index';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

function migrate() {
  try {
    console.log('Migrating database...');
    const migrations = readFileSync(
      join(__dirname, 'migrations', 'create_guild_settings.sql'),
      'utf8'
    );
    db.exec(migrations);
    console.log('Database migrated successfully');
  } catch (error) {
    throw new Error('Failed to migrate database' + error);
  }
}

migrate();
