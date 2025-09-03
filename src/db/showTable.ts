import db from './index';

function showTable() {
  try {
    const result = db.prepare('SELECT * FROM guild_settings').all();
    console.log(result);
  } catch (error) {
    throw new Error('Failed to show table' + error);
  }
}

showTable();
