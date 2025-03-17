import { Client, Events } from 'discord.js';
import Groq from 'groq-sdk'
import { groq_api } from '../config.json'

export default {
    name: Events.ClientReady,
    once: true,
    execute(client: Client) {
        console.log(`Ready! Logged in as ${client.user?.tag}`);
    },
};
