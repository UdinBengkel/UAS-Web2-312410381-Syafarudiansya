# E-Library - Sistem Informasi Rental Buku & Komik Digital

| | |
|---|---|
| **Nama** | *Syafarudiansya* |
| **NIM** | *312410381* |
| **Kelas** | I241A |
| **Mata Kuliah** | *Pemrograman Web 2* |

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
<img width="1459" height="274" alt="Image" src="https://github.com/user-attachments/assets/7ffba2ea-e89f-4c62-8993-a63dc93321a8"/>

### Uji API Tanpa Token (401 Unauthorized)
<img width="1154" height="687" alt="Image" src="https://github.com/user-attachments/assets/88344c79-c681-469f-9ef1-1ff2addb8070" />

### Halaman Login
<img width="1860" height="1079" alt="Image" src="https://github.com/user-attachments/assets/983b419a-ba3d-49ff-9032-b879830d0f3f" />

### Dashboard Admin
<img width="1854" height="1079" alt="Image" src="https://github.com/user-attachments/assets/a030a37b-dba6-489a-b0b2-79efbea109cd" />

### Form Modal Tambah/Edit Data
<img width="1867" height="1079" alt="Image" src="https://github.com/user-attachments/assets/af88dc46-395a-4234-b953-aeefdb838478" />
<img width="1861" height="1079" alt="Image" src="https://github.com/user-attachments/assets/ada7ce7c-0563-4e4f-810a-95c8c7e9e874" />

### Tabel Data
<img width="1864" height="1079" alt="Image" src="https://github.com/user-attachments/assets/e465d843-cd1c-48ab-83e0-caa92afd27ab" />

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
- Demo: [link demo]("https://elibrary-api.freedev.app/index.html")
- Video Presentasi: [Link Youtube](https://www.youtube.com/watch?v=qleKdOAOtiQ)
