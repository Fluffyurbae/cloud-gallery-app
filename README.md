Struktur Project:
cloud-gallery-app/
├── backend/
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
│   └── init.sql
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       └── index.js
└── docker-compose.yml
Prasyarat:
Docker & Docker Compose terinstal
Memiliki akun AWS dengan:
Access Key ID
Secret Access Key
Bucket S3 yang sudah dibuat
Region (ap-southeast-1)
Konfigurasi environment
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-southeast-1
S3_BUCKET=your_bucket_name
Cara menjalankan:
docker compose up --build
Frontend: http://localhost:3000
Backend API: http://localhost:5000
Akses Aplikasi:
Upload gambar di frontend
Gambar akan tersimpan di AWS S3 dan datanya masuk PostgreSQL
Pengujian:
Upload gambar dan cek apakah muncul di galeri
Periksa bucket S3
Jalankan docker exec -it <container_backend> psql -U postgres -d gallery lalu SELECT * FROM images;
Menghentikan Aplikasi:
docker compose down
Untuk menghapus volume:
docker compose down -v