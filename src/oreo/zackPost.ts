import { Message } from "discord.js";

export async function zackPost(message: Message) {
    const url = 'https://api.poe.com/bot/ZackFosterxViola'
    const response = await fetch(url, {method: 'POST',body: message.content})
}