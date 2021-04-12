import discord from "discord.js";
import logger from "./utils/Logger.js"
import config from "./config.js"

const client = new discord.Client();

client.login(config.bot.token)