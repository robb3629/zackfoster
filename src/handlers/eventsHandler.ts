import { Client } from "discord.js";
import fs from "node:fs";
import path from "node:path";
import { Event } from "../interfaces/Event";
import { fileURLToPath } from "node:url";

export class EventHandler {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public async loadEvents(): Promise<void> {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const eventsPath = path.join(__dirname, "../events");
        const eventFiles = fs
            .readdirSync(eventsPath)
            .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            try {
                const eventModule = await import(filePath);
                const event: Event = eventModule.default;

                if (!event.name || !event.execute) {
                    console.error(`Invalid event file: ${file}`);
                    continue;
                }

                const method = event.once ? "once" : "on";
                this.client[method](event.name, (...args: any) => event.execute(this.client, ...args));
            } catch (error) {
                console.error(`Error loading event file ${file}:`, error);
            }
        }
    }
}