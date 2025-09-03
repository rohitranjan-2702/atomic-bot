import db from './index';

function showTable() {
  try {
    const result = db.prepare('SELECT * FROM guild_settings').all();
    if (result.length === 0) {
      console.log('No data found in guild_settings table');
      return;
    }

    console.log(result);
  } catch (error) {
    throw new Error('Failed to show table' + error);
  }
}

showTable();
