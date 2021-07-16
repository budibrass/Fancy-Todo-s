# Fancy-Todo-s
Disini saya membuat Web Apps bernama Fancy Todos, yang dimana saya membuatnya secara Fullstack dari :
- Back End :
    - Database (postgres)
    - Server Api
- Front End : 
    - Custom Desain Bootstrap
    - jQuery and Ajax

## Framework and Package
### Back End
- express
- pg
- sequelize
- sequelize-cli
- jsonwebtoken
- bcryptjs
- cors
- moment

### Front End
- CDN jQuery
- CDN Boostrap V

## Task
Buatlah Fancy Todos App dengan require sebagai berikut :

- Release 0 :
    - Endpoint (WAJIB VALIDASI)
        - title
        - description
        - status
        - due_date (tidak bisa melewati hari yg kemarin)

    - Res Status
        - Jika berhasil res.status 201 dan mengembalikan res.body data object
        - Jika gagal karena validasi maka res.status 400, dan respon body nya berupa object yang berisikan validation errors
        - Jika req gagal karena kesalahan server maka res.status 500
    
- Release 1 :
    - Mengambil semua data dari TODO
        - Jika berhasil kembalikan res.status 200, dan res.body nya array of object dari semua data TODO
        - Jika gagal, res.status 500

- Release 2 :
    - Mengambil detail TODO berdasarkan ID 
        - Jika berhasil res.status 200, dan res.body data TODO berdasarkan ID yang diinputkan
        - Jika gagal karena ID yang tidak ditemukan, res.status 404 dan res.body pesan error dari valdation

- Release 3 :
    - Menambahkan ADD TODO
        - Endpoint (WAJIB VALIDASI)
            - title
            - description
            - status
            - due_date
        
        - Res Status
            - Jika berhasol res.status 201, dan res.body data yang berhasil di update
            - Jika gagal karena validasi, res.status 400 dan res.body validation error
            - Jika req gagal karena kesalaha server maka res.status 500 dan res.body pesan validation error

- Release 4 :
    - Mengedit data TODO
        - Endpoint (WAJIB VALIDASI)
            - title
            - description
            - status
            - due_date
        
        - Res Status
            - Jika berhasol res.status 201, dan res.body data yang berhasil di update
            - Jika gagal karena validasi, res.status 400 dan res.body validation error
            - Jika gagal karena TODO tidak ditemukan, res.status 404, dan res.body pesan validation error
            - Jika req gagal karena kesalaha server maka res.status 500 dan res.body pesan validation error
    
- Release 5 :
    - Menghapus data TODO
         - karena TODO tidak ditemukan maka, res.status 404, dan pesan validation error
        - Jika req gagal karena kesalaha server maka res.status 500 dan res.body pesan validation error

- Release 6 :
    - Buatlah error handling untuk semua error
    - Untuk register akun baru, data password yang dibalikkan ke database sudah harus di `HASH` 

# Getting Started
Hal yang perlu dilakukan untuk memulai Aplikasi Web :

- Pastikan di komputer kamu telah terinstal Postgres
- clone this repository
- cd Fancy-Todo-s
- Back End : 
    - Masuk ke folder server
    - npm install
    - Masuk ke folder config, lalu ubah settingan sesuai dengan di laptop / komputer kamu
        ```JavaScript
            "development": {
                "username": "postgres",
                "password": "postgres",
                "database": "git_fancy_todos",
                "host": "localhost",
                "dialect": "postgres"
            },
        ```
    - npx sequelize db:create
    - npx sequelize db:migrate
    - git checkout -b yourbranch
    - npx nodemon app.js
    - Kamu bisa jalankan program di http://localhost:3000/, untuk testing server bisa menggunakan postman, silahkan pelajarai postman di internet. Jika tidak ingin testing juga tidak masalah.

- Front End :
    - Masuk ke folder Client
    - Pilih index.html
        - bisa jalankan dengan live-server, atau pakai package dari VS CODE, instal plugin live-server nya, lalu di pojok kiri bawah GO-LIVE
    - Program akan jalan di port: `http://127.0.0.1:5500/client/index.html`
    - Selamat menjalankan DEMO Program 