$(document).ready(function () {
    // ==============================
    // PENYIMPANAN DATA
    // ==============================

    function ambilTugas() {
        return JSON.parse(localStorage.getItem("classplan_tugas")) || [];
    }

    function simpanTugas(data) {
        localStorage.setItem("classplan_tugas", JSON.stringify(data));
    }

    function escapeHTML(teks) {
        return String(teks ?? "").replace(/[&<>"']/g, function (karakter) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[karakter];
        });
    }

    function formatDeadline(deadline) {
        const tanggal = new Date(deadline);

        if (isNaN(tanggal.getTime())) {
            return deadline;
        }

        return tanggal.toLocaleString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    // ==============================
    // AJAX: PINDAH HALAMAN
    // ==============================

    const dashboardHTML = $("#kontenUtama").html();

    function muatHalaman(page) {
        if (page === "dashboard") {
            $("#kontenUtama").html(dashboardHTML);

            $(".sidebar .nav-link").removeClass("active");
            $('.sidebar .nav-link[data-page="dashboard"]').addClass("active");

            perbaruiDashboard();
            return;
        }

        let url;

        if (page === "tugas") {
            url = "./pages/tugas.html";
        } else if (page === "form-tugas") {
            url = "./pages/form-tugas.html";
        } else {
            return;
        }

        $.ajax({
            url: url,
            method: "GET",
            dataType: "html",

            success: function (response) {
                $("#kontenUtama").html(response);

                $(".sidebar .nav-link").removeClass("active");
                $('.sidebar .nav-link[data-page="' + page + '"]').addClass("active");

                if (page === "tugas") {
                    perbaruiDaftarTugas();
                }
            },

            error: function () {
                alert("Halaman gagal dimuat. Pastikan file HTML tersedia dan Live Server aktif.");
            }
        });
    }

    // Klik menu navigasi dan link internal
    $(document).on("click", "a[data-page]", function (event) {
        event.preventDefault();

        const page = $(this).attr("data-page");
        muatHalaman(page);
    });

    // ==============================
    // DASHBOARD
    // ==============================

    function perbaruiDashboard() {
        const tugas = ambilTugas();
        const selesai = tugas.filter(function (item) {
            return item.status === "selesai";
        }).length;

        $("#totalTugas").text(tugas.length);
        $("#tugasAktif").text(tugas.length - selesai);
        $("#tugasSelesai").text(selesai);

        const daftar = $("#tugasTerbaru");

        if (!daftar.length) {
            return;
        }

        daftar.empty();

        if (tugas.length === 0) {
            daftar.html(`
                <div class="empty-state">
                    <div class="empty-icon">📝</div>
                    <h3>Belum ada tugas</h3>
                    <p>Tambahkan tugas pertamamu untuk mulai menggunakan ClassPlan.</p>
                    <a href="./pages/form-tugas.html"
                       class="btn-secondary"
                       data-page="form-tugas">
                        Tambah Tugas
                    </a>
                </div>
            `);
            return;
        }

        tugas.slice().reverse().slice(0, 5).forEach(function (item) {
            const sudahSelesai = item.status === "selesai";

            daftar.append(`
                <article class="task-row">
                    <div class="task-info">
                        <h3>${escapeHTML(item.judul)}</h3>
                        <p>
                            ${escapeHTML(item.mataKuliah)}
                            · Deadline: ${escapeHTML(formatDeadline(item.deadline))}
                        </p>
                    </div>

                    <span class="task-status ${sudahSelesai ? "status-done" : "status-active"}">
                        ${sudahSelesai ? "Selesai" : "Belum selesai"}
                    </span>
                </article>
            `);
        });
    }

    // ==============================
    // DAFTAR SEMUA TUGAS
    // ==============================

    function perbaruiDaftarTugas() {
        const daftar = $("#daftarSemuaTugas");

        if (!daftar.length) {
            return;
        }

        const tugas = ambilTugas();

        daftar.empty();

        if (tugas.length === 0) {
            daftar.html(`
                <div class="empty-state">
                    <div class="empty-icon">📝</div>
                    <h3>Belum ada tugas</h3>
                    <p>Silakan tambahkan tugas terlebih dahulu.</p>
                    <a href="./pages/form-tugas.html"
                       class="btn-secondary"
                       data-page="form-tugas">
                        Tambah Tugas
                    </a>
                </div>
            `);
            return;
        }

        tugas.slice().reverse().forEach(function (item) {
            const sudahSelesai = item.status === "selesai";

            daftar.append(`
                <article class="task-row">
                    <div class="task-info">
                        <h3>${escapeHTML(item.judul)}</h3>

                        <p>
                            <strong>Mata Kuliah:</strong>
                            ${escapeHTML(item.mataKuliah)}
                        </p>

                        <p>
                            <strong>Deadline:</strong>
                            ${escapeHTML(formatDeadline(item.deadline))}
                        </p>

                        <p>${escapeHTML(item.deskripsi)}</p>

                        ${item.link ? `
                            <p>
                                <a class="text-link"
                                   href="${escapeHTML(item.link)}"
                                   target="_blank"
                                   rel="noopener noreferrer">
                                    Buka Link Pengumpulan ↗
                                </a>
                            </p>
                        ` : ""}
                    </div>

                    <div class="task-actions">
                        <span class="task-status ${sudahSelesai ? "status-done" : "status-active"}">
                            ${sudahSelesai ? "Selesai" : "Belum selesai"}
                        </span>

                        <button
                            type="button"
                            class="btn-toggle-status"
                            data-id="${item.id}">
                            ${sudahSelesai ? "Batalkan Selesai" : "Tandai Selesai"}
                        </button>

                        <button
                            type="button"
                            class="btn-hapus"
                            data-id="${item.id}">
                            Hapus
                        </button>
                    </div>
                </article>
            `);
        });
    }

    // ==============================
    // VALIDASI DAN SIMPAN TUGAS
    // ==============================

    $(document).on("submit", "#formTugas", function (event) {
        event.preventDefault();

        $(".error-message").text("");

        const mataKuliah = $("#mataKuliah").val().trim();
        const judul = $("#judul").val().trim();
        const deskripsi = $("#deskripsi").val().trim();
        const deadline = $("#deadline").val();
        const link = $("#link").val().trim();

        let valid = true;

        if (!mataKuliah) {
            $("#errorMataKuliah").text("Mata kuliah wajib diisi.");
            valid = false;
        }

        if (!judul) {
            $("#errorJudul").text("Judul tugas wajib diisi.");
            valid = false;
        }

        if (!deskripsi) {
            $("#errorDeskripsi").text("Deskripsi tugas wajib diisi.");
            valid = false;
        }

        if (!deadline) {
            $("#errorDeadline").text("Deadline wajib diisi.");
            valid = false;
        } else if (new Date(deadline).getTime() < Date.now()) {
            $("#errorDeadline").text("Deadline tidak boleh di waktu lampau.");
            valid = false;
        }

        if (link) {
            try {
                const url = new URL(link);

                if (!["http:", "https:"].includes(url.protocol)) {
                    throw new Error("URL tidak valid");
                }
            } catch (error) {
                $("#errorLink").text(
                    "Masukkan link yang valid, diawali http:// atau https://."
                );
                valid = false;
            }
        }

        if (!valid) {
            return;
        }

        const tugas = ambilTugas();

        tugas.push({
            id: Date.now(),
            mataKuliah: mataKuliah,
            judul: judul,
            deskripsi: deskripsi,
            deadline: deadline,
            link: link,
            status: "aktif"
        });

        simpanTugas(tugas);

        alert("Tugas berhasil disimpan!");

        muatHalaman("dashboard");
    });

    // ==============================
    // RESET FORM
    // ==============================

    $(document).on("reset", "#formTugas", function () {
        $(".error-message").text("");
    });

    // ==============================
    // TANDAI TUGAS SELESAI
    // ==============================

    $(document).on("click", ".btn-toggle-status", function () {
        const id = Number($(this).attr("data-id"));
        const tugas = ambilTugas();

        const item = tugas.find(function (t) {
            return t.id === id;
        });

        if (!item) {
            return;
        }

        item.status = item.status === "selesai" ? "aktif" : "selesai";

        simpanTugas(tugas);

        perbaruiDaftarTugas();
        perbaruiDashboard();
    });

    // ==============================
    // HAPUS TUGAS
    // ==============================

    $(document).on("click", ".btn-hapus", function () {
        const id = Number($(this).attr("data-id"));

        if (!confirm("Yakin ingin menghapus tugas ini?")) {
            return;
        }

        const tugas = ambilTugas().filter(function (item) {
            return item.id !== id;
        });

        simpanTugas(tugas);

        perbaruiDaftarTugas();
        perbaruiDashboard();
    });

    // ==============================
    // SAAT WEBSITE DIBUKA
    // ==============================

    perbaruiDashboard();

    // Jika dibuka lewat #tugas atau #form-tugas, langsung muat halaman itu
    const halamanAwal = window.location.hash.replace("#", "");

    if (halamanAwal === "tugas" || halamanAwal === "form-tugas") {
        muatHalaman(halamanAwal);
    }
});