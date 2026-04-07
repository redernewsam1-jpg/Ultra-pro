// 1. Express ਪੈਕੇਜ ਨੂੰ ਇੰਪੋਰਟ ਕਰੋ
const express = require('express');

// 2. App ਨੂੰ ਡਿਫਾਈਨ ਕਰੋ (ਇਹੀ ਲਾਈਨ ਪਹਿਲਾਂ ਮਿਸਿੰਗ ਸੀ)
const app = express();

// 3. Port ਸੈੱਟ ਕਰੋ (Render ਆਟੋਮੈਟਿਕਲੀ ਪੋਰਟ ਦਿੰਦਾ ਹੈ, ਨਹੀਂ ਤਾਂ 3000 ਵਰਤੇਗਾ)
const PORT = process.env.PORT || 3000;

// 4. Main Route (ਜਦੋਂ ਕੋਈ ਸਿੱਧਾ ਤੁਹਾਡਾ ਲਿੰਕ ਖੋਲ੍ਹੇਗਾ)
app.get("/", (req, res) => {
    res.send("🚀 Ultra Pro System is Running Live on Render!");
});

// 5. ਤੁਹਾਡਾ Bot API Route
app.get("/Renderautoapi_bot", (req, res) => {
    // ਤੁਸੀਂ ਇੱਥੇ JSON ਰਿਸਪਾਂਸ ਭੇਜ ਸਕਦੇ ਹੋ
    res.json({
        status: "Success",
        message: "Bot API is Live! 🤖",
        owner_id: "1403488629"
    });
});

// 6. ਸਰਵਰ ਨੂੰ ਸਟਾਰਟ ਕਰੋ
app.listen(PORT, () => {
    console.log(`✅ Server is perfectly running on port ${PORT}`);
});
