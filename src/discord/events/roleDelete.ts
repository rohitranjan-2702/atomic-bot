import { Role, Events } from 'discord.js';
import db from '../../db';

export default {
  name: Events.GuildRoleDelete,
  async execute(role: Role) {
    const stmt = db.prepare(
      'UPDATE guild_settings SET admin_role_id = NULL, updated_at=CURRENT_TIMESTAMP WHERE guild_id = ? AND admin_role_id = ?'
    );
    stmt.run(role.guild.id, role.id);
    console.warn(`Role ${role.id} deleted, cleaned admin_role binding.`);
  },
};
