import { Client, Events, Message, MessageFlags, User } from "discord.js";
import { zackPost } from "../oreo/zackPost";
import { getChannels } from "../database";

export default {
    name: Events.MessageCreate,
    once: false,
    async execute(client: Client, message: Message) {

        if (message.author.id === client.user.id) return

        
        if (message.guild.id === '1350574944055984299') {
            // Use message.reply instead of interaction.reply
            await message.author.send({
                content: "You need to set a channel where I can speak",
            }).catch(console.error);
            if (message.author.id !== message.guild.ownerId) {
                const owner = await message.guild.fetchOwner()
                await owner.send({
                    content: "You need to set a channel where I can speak",
                })
            }
            return;
        }
        
        const zackResponse = await zackPost(message)
        message.reply(zackResponse)
        return
    }
};
