import { Client, GatewayIntentBits } from "discord.js";
import { token } from "./config.json";
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

client.on("guildCreate", async (guild) => {
    await deployCommands({ guildId: guild.id });
    console.log(guild.id)
});

const eventHandler = new EventHandler(client)
eventHandler.loadEvents()

client.login(token);
