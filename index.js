// 🔴 ਇੱਥੇ Saini_bots ਦੀ ਜਗ੍ਹਾ ਤੁਹਾਡੇ ਬੋਟ ਦਾ ਨਾਮ ਆਵੇਗਾ
app.get("/Renderautoapi_bot", (req, res) => {
  let { url, user_id } = req.query;

  if (!url || !user_id) {
    return res.send("Error ❌ URL ਜਾਂ user_id ਮਿਸਿੰਗ ਹੈ!");
  }

  // 🚀 Short Trick: ਲਿੰਕ ਦੇ ਪਿੱਛੋਂ '@Renderautoapi_bot' ਨੂੰ ਕੱਟਣ ਲਈ
  const cleanUrl = url.split('@')[0];

  res.send("✅ Request Received! ਵੀਡੀਓ ਤੁਹਾਡੇ @Renderautoapi_bot ਟੈਲੀਗ੍ਰਾਮ 'ਤੇ ਆ ਰਹੀ ਹੈ... ⏳");

  const file = `video_${Date.now()}.mp4`;

  // Ultimate Bypass Code
  const cmd = `yt-dlp -f best -o "${file}" \\
  --user-agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \\
  --add-header "Origin: https://web.classplusapp.com" \\
  --add-header "Referer: https://web.classplusapp.com/" \\
  "${cleanUrl}"`;

  bot.sendMessage(user_id, "🌐 API Link ਰਾਹੀਂ ਡਾਊਨਲੋਡ ਸ਼ੁਰੂ ਹੋ ਗਿਆ ਹੈ... ⏳").catch(() => {});

  exec(cmd, async (err, stdout, stderr) => {
    if (err) {
      return bot.sendMessage(user_id, `API Failed ❌\nਕਾਰਨ: ${stderr.substring(0, 150)}`).catch(() => {});
    }

    try {
      await bot.sendVideo(user_id, file, { caption: "Downloaded via API Link ✅" });
      fs.unlinkSync(file); 
    } catch (sendErr) {
      bot.sendMessage(user_id, "Error ❌").catch(() => {});
    }
  });
});
