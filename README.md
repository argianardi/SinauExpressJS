# Pokok Bahasan:

- [Routing](https://github.com/argianardi/expressJS-doc/tree/main/routing)
- [Middleware](https://github.com/argianardi/expressJS-doc/tree/main/middleware)
- [Error Handling](https://github.com/argianardi/expressJS-doc/tree/main/error_handling)
- [File Request](https://github.com/argianardi/expressJS-doc/tree/main/file_request)

## Persiapan Project

Terdapat beberapa hal yang harus kita siapkan sebelum membuat project [[1]](https://www.youtube.com/watch?v=CNOrmjmK-eM&list=PLwdv9eOjH5CZrEPvWIzJqdaPfeCny9urc&index=2):

- Buat file utama project bisa dinamai dengan app.js atau index.js
- Arahkan fokus teminal ke directory project, kemudian command `npm init` dan isi beberapa pertanya yang diajukan:

  - package name
  - version
  - description
  - entry point (file utama)
  - git repository (bisa dikosongkan dulu)
  - keywords
  - author
  - license (bisa diisi dengan ISC)
  - kemudain command ok sehingga nanti akan muncul file package.json

- Install expressJS dengan command `npm install --save express`

- Buat file server.js untuk menghandle server yang akan digunakan untuk project kita <br>
  Pada file server buat blok code berikut:

  ```
  const http = require("http");
  const app = require("./index");

  const port = process.env.PORT || 2023;

  const server = http.createServer(app);
  server.listen(port);
  ```

  `index` adalah file utama di project ini, berisi blok code untuk menginisialisasi express:

  ```
  const express = require("express");
  const app = express();

  app.use((req, res, next) => {
    res.status(200).json({
        message: `Restfull nodejs dan express`,
    });
  });

  module.exports = app;
  ```

- Jalankan file server.js menggunakan node js dengan command `nodemon server.js` <br>
  Setelah itu coba kita jalankan `http://localhost:2023/` di browser hasilnya akan menghasilkan response:
  ```
  {
    "message":"Restfull nodejs dan express"
  }
  ```

## Membuat Routes

Terdapat beberapa langkah yang harus dijalankan dalam membuat routing [[1]](https://www.youtube.com/watch?v=qRXOQ-ahoLA&list=PLwdv9eOjH5CZrEPvWIzJqdaPfeCny9urc&index=3):

- Buat folder routes untuk menampung semua file yang berkaitan dengan route
- Di dalam folder routes buat file mahasiswa.js <br>
  Pada file ini buat inisialisasi express js dan express route, kemudian buat dan export fungsi routing:

  ```
  const express = require("express");
  const router = express.Router();

  router.get("/", (req, res, next) => {
      res.status(200).json({
          message: "get method mahasiswa",
      });
  });

  router.post("/", (req, res, next) => {
      res.status(200).json({
          message: "post method mahasiswa",
      });
  });

  router.get("/:nim", (req, res, next) => {
    const nim = req.params.nim;
    if (nim === "12345") {
        res.status(200).json({
        message: "NIM 12345",
        });
    } else {
        res.status(200).json({
        message: "NIM Lain",
        });
    }
  });

  module.exports = router;
  ```

- Pada file utama (index) buat function routing untuk mahasiswa dengan menggunakan function routing dari file `mahasiswa.js` yang diimport menggunakan `require`:

  ```
  const express = require("express");
  const app = express();
  //------------------------------------------------
  const mahasiswaRoutes = require("./routes/mahasiswa");

  app.use('/mahasiswa', mahasiswaRoutes)
  //------------------------------------------------

  module.exports = app;
  ```

- Hasilnya saat di postman jika kita mencoba request get dengan url `http://localhost:2023/mahasiswa` akan menghasilkan status 200 dan body response:

  ```
  {
    "message": "get method mahasiswa"
  }
  ```

  Begitu juga jika kita melakukan request post menggunakan url `http://localhost:2023/mahasiswa` akan menghasilkan status 200 dan body response:

  ```
  {
      "message": "post method mahasiswa"
  }
  ```

  Jika kita melakukan request get dengan url `http://localhost:2023/mahasiswa/12345` akan menghasilkan status 200 dan body response:

  ```
  {
  "message": "NIM 12345"
  }
  ```

  Tetapi jika kita melakukan request get menggunakan url dengan nim selain 12345 maka akan menghasilkan status 200 dan body response:

  ```
  {
  "message": "NIM Lain"
  }
  ```

## Reference

- [[1] Programmer Copy Paste](https://www.youtube.com/watch?v=CNOrmjmK-eM&list=PLwdv9eOjH5CZrEPvWIzJqdaPfeCny9urc&index=2)
