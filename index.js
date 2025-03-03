const express = require("express");
const app = express();
// Встановлюємо порт з змінної середовища або 10000 за замовчуванням
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Сайт працює!");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});