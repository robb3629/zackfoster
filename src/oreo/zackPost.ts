import { Message } from "discord.js";
import Groq from 'groq-sdk'
import { groq_api } from "../config.json";
import { zackPersonality } from "../misc/zackPersonality";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";

const messageHistory = new Map<string, Array<ChatCompletionMessageParam>>()
const MAX_HISTORY_LENGTH = 15

export async function zackPost(message: Message) {
    try {
        const groq = new Groq({ apiKey: groq_api })
        const contextId = message.author.id

        if (!messageHistory.has(contextId)) {
            messageHistory.set(contextId, [
                {role: "system", content: zackPersonality} as ChatCompletionMessageParam
            ])
        }

        const currentHistory = messageHistory.get(contextId)!

        currentHistory.push({
            role: "user",
            content: message.content
        } as ChatCompletionMessageParam)

        if (currentHistory.length > MAX_HISTORY_LENGTH + 1) {
            currentHistory.splice(1, 1)
        }

        const chatCompletion = await groq.chat.completions.create({
            messages: currentHistory,
            model: "llama3-8b-8192",
        });

        const responseContent =
            chatCompletion.choices[0]?.message?.content || "No response";

        currentHistory.push({
            role: "assistant",
            content: responseContent
        } as ChatCompletionMessageParam)
        
        return responseContent
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
}