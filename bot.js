// Advanced command with Ultimate Bypass
bot.onText(/\/video (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const url = match[1];
  const file = `video_${Date.now()}.mp4`;

  try {
    await bot.sendMessage(chatId, "Fetching protected video... ⏳");

    // 🔴 ਇੱਥੇ ਅਸੀਂ Chrome ਬ੍ਰਾਊਜ਼ਰ ਦਾ ਭੇਸ ਬਣਾਇਆ ਹੈ
    const cmd = `yt-dlp -f best -o "${file}" \\
    --user-agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \\
    --add-header "Origin: https://web.classplusapp.com" \\
    --add-header "Referer: https://web.classplusapp.com/" \\
    "${url}"`;

    exec(cmd, async (err, stdout, stderr) => {
      if (err) {
        // ਇਹ ਲਾਈਨ ਸਾਨੂੰ ਅਸਲੀ ਐਰਰ ਦੱਸੇਗੀ
        return bot.sendMessage(chatId, `Failed ❌\nਕਾਰਨ: ${stderr.substring(0, 150)}`);
      }

      await bot.sendVideo(chatId, file, { caption: "Done ✅" });
      fs.unlinkSync(file);
    });

  } catch (err) {
    bot.sendMessage(chatId, "Error ❌");
  }
});
