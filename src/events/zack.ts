import { Client, Events, Message } from 'discord.js'

export default {
    name: Events.MessageCreate,
    once: false,
    execute(client: Client, message: Message) {
        if((message.author.id === '631567724555927583' || message.author.id === '1347229382007066694') && message.channel.id === '1350574944055984299') {
            console.log(`Message Content: ${message.content}\nMessage Author: ${message.author.username}`)
            message.reply({ content: 'sono un twink' });
        }
    },
};