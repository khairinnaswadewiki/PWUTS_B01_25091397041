const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/tugas", (req, res) => {
    console.log("Data tugas diterima:", req.body);

    res.json({
        sukses: true,
        pesan: "Tugas berhasil diterima server!"
    });
});

app.listen(PORT, () => {
    console.log(`ClassPlan berjalan di http://localhost:${PORT}`);
});