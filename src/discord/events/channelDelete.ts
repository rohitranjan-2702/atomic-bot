import { Channel, Events } from 'discord.js';
import db from '../../db';

export default {
  name: Events.ChannelDelete,
  async execute(channel: Channel) {
    if (!channel.isTextBased() || !channel.id) return;
    const stmt = db.prepare(
      'UPDATE guild_settings SET stats_channel_id = CASE WHEN stats_channel_id = ? THEN NULL ELSE stats_channel_id END, leaderboard_channel_id = CASE WHEN leaderboard_channel_id = ? THEN NULL ELSE leaderboard_channel_id END, updated_at=CURRENT_TIMESTAMP WHERE guild_id = ?'
    );
    stmt.run(channel.id, channel.id);
    console.warn(`Channel ${channel.id} deleted, cleaned bindings if any.`);
  },
};
