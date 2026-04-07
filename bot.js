const TelegramBot = require("node-telegram-bot-api");
const { exec } = require("child_process");
const fs = require("fs");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "ULTRA BOT READY 😎");
});

// Advanced command
bot.onText(/\/video (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const url = match[1];
  const file = `video_${Date.now()}.mp4`;

  try {
    await bot.sendMessage(chatId, "Fetching protected video... ⏳");

    const cmd = `yt-dlp -f best -o "${file}" \
    --add-header "Referer: https://example.com" \
    "${url}"`;

    exec(cmd, async (err) => {
      if (err) return bot.sendMessage(chatId, "Failed ❌");

      await bot.sendVideo(chatId, file, { caption: "Done ✅" });

      fs.unlinkSync(file);
    });

  } catch (err) {
    bot.sendMessage(chatId, "Error ❌");
  }
});