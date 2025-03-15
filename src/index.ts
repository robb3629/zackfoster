import { Client } from "discord.js";
import { token, client_id } from "./config.json";
import { commands } from "./commands";
import { deployCommands } from "./misc/deploy-commands";

const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages"],
});

client.once("ready", () => {
  console.log("Discord bot is ready! 🤖");
  
  console.log(`Bot is in ${client.guilds.cache.size} servers:`);
  client.guilds.cache.forEach(guild => {
    console.log(`- ${guild.name} (ID: ${guild.id})`);
  });
});

client.on("guildCreate", async (guild) => {
  await deployCommands({ guildId: guild.id });
  console.log(guild.id)
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(interaction);
  }
});

client.login(token);
