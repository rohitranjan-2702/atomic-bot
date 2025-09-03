import db from './index';

function clean() {
  try {
    const result = db.prepare('DELETE FROM guild_settings').run();
    console.log(result);
  } catch (error) {
    throw new Error('Failed to clean table' + error);
  }
}

clean();
