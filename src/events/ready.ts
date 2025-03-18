import { Client, Events } from "discord.js";
import { addServer, getServerId } from "../database";

export default {
    name: Events.ClientReady,
    once: true,
    execute(client: Client) {
        console.log("Discord bot is ready! 🤖");
        console.log(`Bot is in ${client.guilds.cache.size} servers:`);

        // Process each guild sequentially to avoid database locks
        for (const guild of client.guilds.cache.values()) {
            try {
                console.log(`- ${guild.name} (ID: ${guild.id})`);
                const foundId = getServerId(guild.id);
                if (!foundId) {
                    addServer(guild.id, guild.ownerId);
                }
            } catch (error) {
                console.error(`Error processing guild ${guild.id}:`, error);
            }
        }
    },
};
