# Discord Bot Skeleton

Clean, ID-driven Discord bot built with TypeScript + better-sqlite3.

## Folder Structure

```
/src
  /discord
    /commands   →  Slash command files (one per command)
    /events     →  Discord.JS event handlers
    loader.ts   →  Auto-loads commands & events
  config.ts      →  Env loading & validation
  /db         →  SQLite implementation + migration script
```

## Features

• **/bind / /status** – bind a resource to a channel/role and view current bindings  
• **/leaderboard** – posts a mock leaderboard to the bound channel  
• **/ping-stats** – (bonus) pings the stats channel  
• Graceful handling of missing/deleted channels & roles  
• Per-guild settings stored in SQLite (`guild_settings` table)  
• ESLint + Prettier with CI workflow

## Quick Start

1. `pnpm install`
2. Copy env template: `cp env.example .env` and fill `DISCORD_TOKEN`, `DISCORD_CLIENT_ID`.
3. Run `pnpm db:setup` to setup loacl sqlite database.
4. Run the bot: `pnpm dev`.
5. Invite to your server `https://discord.com/api/oauth2/authorize?client_id=1412691463485263986&permissions=0&scope=bot%20applications.commands`

Slash commands are registered globally when the bot becomes ready.

## Migrations

`db.ts` runs an idempotent migration creating `guild_settings` at startup—no extra steps required.

## Contributing / Linting

```
pnpm run lint   # ESLint + TypeScript rules
```

GitHub Actions runs the same command on every pull request.
