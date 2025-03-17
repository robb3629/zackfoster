import { Client, Events, Interaction } from 'discord.js';
import { commands } from '../commands'

export default {
    name: Events.InteractionCreate,
    once: true,
    execute(client: Client, interaction: Interaction) {
        if (!interaction.isCommand()) {
            return;
          }
          const { commandName } = interaction;
          if (commands[commandName as keyof typeof commands]) {
            commands[commandName as keyof typeof commands].execute(interaction);
          }
    },
};