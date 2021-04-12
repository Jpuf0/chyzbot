import discord from "discord.js";
import logger from "./utils/Logger.js"
import config from "./config"

const client = discord.Client();

client.login(config.bot.token)