import { Client, Events, Message } from "discord.js";
import { zackPost } from "../oreo/zackPost";

export default {
    name: Events.MessageCreate,
    once: false,
    async execute(client: Client, message: Message) {
        
        if (message.author.id !== client.user.id && message.channel.id === '1350574944055984299' || message.guild.id === '1216125718191149096' && message.author.id !== client.user.id) {
            const zackResponse = await zackPost(message)
            message.reply(zackResponse)
        }
    },
};
