# E-Library - Sistem Informasi Rental Buku & Komik Digital

| | |
|---|---|
| **Nama** | *Syafarudiansya* |
| **NIM** | *312410381* |
| **Kelas** | I241A |
| **Mata Kuliah** | Pengolahan Citra |
| **Topik** | Deteksi Pejalan Kaki dengan HOG + Linear SVM |

Aplikasi web full-stack untuk manajemen perpustakaan digital, dibangun dengan arsitektur decoupled (Backend API + Frontend SPA).

## Teknologi
- **Backend:** CodeIgniter 4 (RESTful API)
- **Frontend:** VueJS 3 + Vue Router (CDN)
- **UI:** TailwindCSS (CDN)
- **Database:** MySQL
- **HTTP Client:** Axios

## Struktur Folder
```
UAS/
├── backend-api/   → CodeIgniter 4
└── frontend-spa/  → VueJS 3 SPA
```

## Screenshot

### Skema Database
![Database Schema](<img width="1459" height="274" alt="Image" src="https://github.com/user-attachments/assets/7ffba2ea-e89f-4c62-8993-a63dc93321a8" />)

### Uji API Tanpa Token (401 Unauthorized)
![401 Error](screenshots/postman_401.png)

### Halaman Login
![Login](screenshots/login.png)

### Dashboard Admin
![Dashboard](screenshots/dashboard.png)

### Form Modal Tambah/Edit Data
![Modal](gambar/modal.png)

### Tabel Data
![Table](screenshots/table.png)

## Instalasi

### Backend
```bash
cd backend-api
composer install
# Sesuaikan konfigurasi database di app/Config/Database.php
# Import database: elibrary_db.sql
php spark serve
```

### Frontend
```bash
cd frontend-spa
php -S localhost:5500
# Atau buka dengan Live Server di VS Code
```

### Akun Default
- Username: `admin`
- Password: `admin123`

## Link
- Demo: [link demo]
- Video Presentasi: [link youtube]
