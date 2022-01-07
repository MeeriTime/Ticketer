<div align="center">

[![Discord Bots](https://top.gg/api/widget/880454049370083329.svg)](https://top.gg/bot/880454049370083329)

</div><br>

<div align="center">
  <img src="https://shields.io/github/package-json/v/CarelessInternet/Ticketer">
  <img src="https://shields.io/github/license/CarelessInternet/Ticketer">
  <img src="https://shields.io/github/commit-activity/m/CarelessInternet/Ticketer?color=green">
</div>

# Ticketer

Welcome to the official GitHub page for the Ticketer bot! You can find all of the source code right here!<br>
The source code is mainly for educational and demonstration purposes on building a Discord bot.<br>
I advise you to only clone this repository for making pull requests, or making your own private version of the bot

## Support

[The Link to the Discord Server](https://discord.gg/kswKHpJeqC)

## Need a DB?

If you're planning on hosting your own version of the bot and are in need of a database, contact `🙏Hope#0001` on Discord. They can also be found in the support server.

## Setup

#### Getting the Files

Obviously, you're gonna need the files to run anything. Get them by running `git clone https://github.com/CarelessInternet/Ticketer.git`

#### Installing MySQL

You're gonna need MySQL to run this bot, please find a [tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04) on how to setup MySQL on your system if you don't have it, and come back when you are done

#### Creating `.env` File

In order to do anything with the bot, create a file named `.env` and add all necessary environment variables that can be found in `src/environment.d.ts`<br>
Don't forget to enable the Server Members, Presence Intent, and Message Content Intent for your bot<br>
Template:
```env
NODE_ENV="development or production"
DISCORD_BOT_TOKEN="bots_token"
DISCORD_CLIENT_ID="bots_client ID"
DISCORD_GUILD_ID="main_server ID"
DISCORD_OWNER_ID="Owner's ID - your ID"
TOP_GG_TOKEN="get from top.gg (not required unless running in production)"
DB_HOST="Host URL of the database"
DB_USER="DB username"
DB_PASSWORD="DB password"
DB_DATABASE="Name of the DB"
DB_PORT="usually 3306"
```

#### Installing Dependencies

Run the command `npm i` to install all dependencies. This is only needed once

#### Building

Run the command `npm run build` to compile the files

#### Creating MySQL Table

Run the command `npm run mysql` to create all necessary tables. This is only needed once

#### Deploying Commands

Run the command `npm run deploy` to deploy the commands. This is only needed once if you're not adding new commands.
If you are adding new commands, run this command when you have done so

#### Running the Bot

Run the command `npm start` to run the bot in a development environment.<br>
Run the command `npm run production` for a production environment (NEVER run this unless you're running the bot for production, and the bot is in [top.gg](https://top.gg))

## Issues

If you can't get the bot to run, join the [support server](https://discord.gg/kswKHpJeqC) and create a support ticket in `#support`.<br>
For any bug reports, suggestions or general feedback, please submit an issue or join the support server.

## Pull Requests

If you found any bug and created code to solve it, or updated anything important, feel free to submit a pull request so I can merge it into the main branch.<br>
You can also submit a pull request if you made a new command and want it to be a part of the production bot
