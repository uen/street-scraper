import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import "dotenv/config";
import { chunk } from "lodash";
export const sendDiscordMessage = (content: string) => {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  const splitContent = chunk(content.split("\n\n"), 1);

  client.on("ready", () => {
    console.log(`Logged in as ${client?.user?.tag}!`);

    const channel = client.channels.cache.find((channel) => {
      return channel.id === process.env.DISCORD_CHANNEL_ID;
    }) as TextChannel;

    if (channel?.isTextBased()) {
      splitContent.forEach((chunk) => {
        channel.send(chunk.join("\n"));
      });
    }
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
      await interaction.reply("Pong!");
    }
  });

  client.login(process.env.DISCORD_TOKEN);
};
