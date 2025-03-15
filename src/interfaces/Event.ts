import { Client, Events } from "discord.js";

export interface Event {
    name: keyof typeof Events;
    once?: boolean;
    execute: (client: Client, ...args: any[]) => Promise<void> | void;
}