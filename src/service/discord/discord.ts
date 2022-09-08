import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import "dotenv/config";
import { chunk } from "lodash";
import { APP_CONFIG } from "../../config";

export const sendDiscordMessage = (content: string) => {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  const splitContent = chunk(content.split("\n\n"), 1);

  client.on("ready", async () => {
    console.log(`Logged in as ${client?.user?.tag}!`);

    const channel = client.channels.cache.find((channel) => {
      return channel.id === process.env.DISCORD_CHANNEL_ID;
    }) as TextChannel;

    if (channel?.isTextBased()) {
      for (const chunk of splitContent) {
        if (!APP_CONFIG.dryRun) {
          await channel.send(chunk.join("\n"));
        }
      }
    }

    client.destroy();
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
      await interaction.reply("Pong!");
    }
  });

  client.login(process.env.DISCORD_TOKEN);
};
