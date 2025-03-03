const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Сайт працює!");
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on http://localhost:3000");
});