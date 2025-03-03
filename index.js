const express = require("express");
const path = require("path");
const app = express();

// Встановлюємо EJS як шаблонний движок
app.set("view engine", "ejs");

// Вказуємо директорію для збереження шаблонів EJS
app.set("views", path.join(__dirname, "views"));

// Статичні файли (CSS, JS, зображення)
app.use(express.static(path.join(__dirname, "public")));

// Головний маршрут для рендерингу сторінки
app.get("/", (req, res) => {
    res.render("index"); // Ваш шаблон 'index.ejs'
});

// Встановлюємо порт для сервера
const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});