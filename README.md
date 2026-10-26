# ClassPlan — Academic Task Manager

## 1. Deskripsi Proyek

ClassPlan adalah aplikasi berbasis web yang dirancang untuk membantu mahasiswa mengelola tugas kuliah secara lebih teratur. Aplikasi ini memungkinkan mahasiswa menambahkan tugas, melihat daftar tugas, memantau deadline, serta menandai tugas yang telah selesai.

Proyek ini dibuat untuk memenuhi tugas Ujian Tengah Semester (UTS) mata kuliah Pemrograman Web.

## 2. Tujuan

- Membantu mahasiswa mengelola tugas kuliah.
- Memudahkan mahasiswa memantau deadline tugas.
- Menampilkan status tugas yang belum selesai dan sudah selesai.
- Menerapkan HTML, CSS, JavaScript, jQuery, dan Node.js dalam pengembangan web.

## 3. Fitur Utama

- **Dashboard:** Menampilkan ringkasan jumlah seluruh tugas, tugas yang belum selesai, dan tugas yang sudah selesai.
- **Daftar Tugas:** Menampilkan tugas yang telah ditambahkan.
- **Tambah Tugas:** Menambahkan tugas dengan informasi mata kuliah, judul, deskripsi, deadline, dan tautan pengumpulan.
- **Validasi Formulir:** Memeriksa kelengkapan data dan format tautan sebelum tugas disimpan.
- **Status Tugas:** Mengubah status tugas menjadi selesai atau belum selesai.
- **Hapus Tugas:** Menghapus tugas yang tidak diperlukan.
- **Penyimpanan Data:** Menggunakan localStorage untuk menyimpan data di browser.
- **Server Node.js:** Menyediakan endpoint untuk menerima data tugas melalui HTTP.

## 4. Teknologi yang Digunakan

- HTML5
- CSS3
- JavaScript
- jQuery
- Node.js
- Express.js
- Body-parser
- Browser localStorage

## 5. Struktur Folder

```text
PWUTS_B01_25091397041/
├── css/
│   └── style.css
├── js/
│   └── script.js
├── pages/
│   ├── form-tugas.html
│   └── tugas.html
├── node_modules/
├── index.html
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## 6. Cara Menjalankan Aplikasi

### Persyaratan

Pastikan Node.js dan npm sudah terpasang di komputer.

### Langkah Menjalankan

1. Buka folder proyek melalui Visual Studio Code.
2. Buka terminal di Visual Studio Code.
3. Jalankan perintah berikut untuk memasang dependensi:

   ```bash
   npm install
   ```

4. Jalankan server menggunakan perintah:

   ```bash
   node server.js
   ```

5. Jika server berhasil berjalan, terminal akan menampilkan alamat:

   ```text
   ClassPlan berjalan di http://localhost:3000
   ```

6. Buka browser dan akses:

   `http://localhost:3000`

7. Gunakan menu Dashboard, Daftar Tugas, dan Tambah Tugas untuk mencoba fitur aplikasi.

**Catatan:** Biarkan terminal tetap berjalan selama aplikasi digunakan. Untuk menghentikan server, tekan `Ctrl + C` pada terminal.

## 7. Cara Menggunakan Aplikasi

1. Buka halaman utama ClassPlan.
2. Pilih menu **Tambah Tugas**.
3. Isi informasi tugas yang diperlukan.
4. Klik tombol **Simpan Tugas**.
5. Buka menu **Daftar Tugas** untuk melihat tugas yang telah ditambahkan.
6. Gunakan tombol status untuk menandai tugas selesai atau mengembalikannya ke status belum selesai.
7. Gunakan tombol hapus jika ingin menghapus tugas.
8. Periksa Dashboard untuk melihat ringkasan tugas.

## 8. Penyimpanan dan Server

Aplikasi menggunakan `localStorage` pada browser untuk menyimpan data tugas agar tetap tersedia ketika halaman dimuat ulang pada browser yang sama.

Proyek juga memiliki server berbasis Node.js dan Express.js dengan endpoint `POST /tugas` untuk menerima data tugas melalui HTTP.

**Catatan pengembangan:** Penyimpanan melalui `localStorage` berbeda dengan penyimpanan di server. Endpoint server yang tersedia perlu dihubungkan dengan formulir agar data yang dikirim benar-benar diterima oleh server. Data yang tersimpan di `localStorage` tidak otomatis tersimpan di server.

## 9. Pengembang

- **Kelompok:** B01
- **NIM:** 25091397041
- **Mata Kuliah:** Pemrograman Web
- **Nama Aplikasi:** ClassPlan

## 10. Penutup

ClassPlan diharapkan dapat membantu mahasiswa mengelola tugas kuliah dengan lebih terstruktur, memantau deadline, dan menyelesaikan pekerjaan akademik tepat waktu.
