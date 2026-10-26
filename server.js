const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Halaman di /pages hanya potongan konten (dimuat lewat AJAX).
// Kalau dibuka langsung dari browser, arahkan ke layout utama agar CSS & sidebar ikut tampil.
app.get(/^\/pages\/([\w-]+)\.html$/, (req, res, next) => {
    if (req.get("X-Requested-With") === "XMLHttpRequest") {
        return next();
    }
    res.redirect("/#" + req.params[0]);
});

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