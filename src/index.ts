import { Client, GatewayIntentBits } from "discord.js";
import { token, client_id } from "./config.json";
import { commands } from "./commands";
import { deployCommands } from "./misc/deploy-commands";
import { EventHandler } from "./handlers/eventsHandler";

const client = new Client({
    // intents: ["Guilds", "GuildMessages", "DirectMessages", "MessageContent"],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent, // <-- This intent is crucial
      ]
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

const eventHandler = new EventHandler(client)
eventHandler.loadEvents()

client.login(token);
