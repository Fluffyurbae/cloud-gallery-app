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
- Docker & Docker Compose terinstal
- MinIO telah terinstal sebagai service melalui Docker Compose

Konfigurasi environment:
AWS_ACCESS_KEY_ID=minioadmin
AWS_SECRET_ACCESS_KEY=minioadmin123
AWS_REGION=us-east-1
S3_BUCKET=cloud-gallery
S3_ENDPOINT=http://minio:9000

Cara menjalankan:
docker compose up --build
Frontend: http://localhost:3000
Backend API: http://localhost:5000
MinIO Console: http://localhost:9090

Akses Aplikasi:
1. Upload gambar di frontend
2. Gambar akan tersimpan di MinIO dan URL-nya disimpan di PostgreSQL

Pengujian:
- Upload gambar dan cek apakah muncul di galeri
- Periksa bucket 'cloud-gallery' di MinIO Console
- Jalankan perintah:
  docker exec -it <container_backend> psql -U postgres -d gallery
  lalu:
  SELECT * FROM images;

Menghentikan Aplikasi:
docker compose down
Untuk menghapus volume:
docker compose down -v
