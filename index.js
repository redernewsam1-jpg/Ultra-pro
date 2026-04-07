const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");

const app = express();

// Security token
const API_KEY = process.env.API_KEY || "12345";

app.get("/", (req, res) => {
  res.send("ULTRA PRO API 🚀");
});

// Secure download
app.get("/download", (req, res) => {
  const { url, key } = req.query;

  if (key !== API_KEY) return res.send("Unauthorized ❌");
  if (!url) return res.send("No URL");

  const file = `video_${Date.now()}.mp4`;

  // Headers support (important for protected streams)
  const cmd = `yt-dlp -f best -o "${file}" \
  --add-header "Referer: https://example.com" \
  "${url}"`;

  exec(cmd, (err) => {
    if (err) return res.send("Download failed ❌");

    res.download(file, () => {
      fs.unlinkSync(file);
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("ULTRA API running"));