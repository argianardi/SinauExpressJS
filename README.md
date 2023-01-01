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

## Body Parser

Body parser adalah library yang berisi middleware untuk membaca sebuah data yang dikirimkan oleh http post dan menyimpannya sebagai object javascript yang dapat diakses melalui req.body [[2]](https://santrikoding.com/tutorial-expressjs-restful-api-4-insert-data-ke-database). Berikut cara penggunaannya [[1]](https://www.youtube.com/watch?v=sjRtGR8tQDI&list=PLwdv9eOjH5CZrEPvWIzJqdaPfeCny9urc&index=4):

- Install body parser dengan command:

  ```
  npm install --save body-parser
  ```

- Inisiasi body parser di file utama project (di contoh index.js)

  ```
  const express = require("express");
  const app = express();
  //-----------------------------------------------------
  const bodyParser = require("body-parser");

  const mahasiswaRoutes = require("./routes/mahasiswa");

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  //-----------------------------------------------------
  app.use("/mahasiswa", mahasiswaRoutes);

  module.exports = app;
  ```

- Buat `req.body` di routing function dengan method post (di contoh di bagian file mahasiswa.js)

  ```
  const express = require("express");
  const router = express.Router();

  router.get("/", (req, res, next) => {
      res.status(200).json({
          message: "get method mahasiswa",
      });
  });

  router.post("/", (req, res, next) => {
    //---------------------------------------------------
      const mahasiswa = {
          nim: req.body.nim,
          nama: req.body.nama,
      };
    //---------------------------------------------------
      res.status(200).json({
          message: "post method mahasiswa",
          data: mahasiswa,
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

  Maka jika kita melakukan request post menggunakan url `http://localhost:2023/mahasiswa` dan membuat body request berikut:

  ```
  {
      "nim": "12345",
      "nama": "Uchiha Itachi "
  }
  ```

  Akan menghasilkan status 200 dan body response:

  ```
  {
      "message": "post method mahasiswa",
      "data": {
          "nim": "12345",
          "nama": "Uchiha Itachi "
      }
  }
  ```

## Error Handling

Digunakan untuk memberikan keterangan error saat request yang dilakukan user terjadi kesalahan. Untuk melakukannya langsung tambahkan function error handling di tempat yang kita inginkan (di contoh di bagian file utama project yaitu index.js)

```
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const mahasiswaRoutes = require("./routes/mahasiswa");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/mahasiswa", mahasiswaRoutes);

//--------------------------------------------------
app.use((req, res, next) => {
    const error = new Error("Tidak ditemukan");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: error.message,
    });
});
//--------------------------------------------------
module.exports = app;
```

Dengan adanya function error handling di atas semua routes (user melakukan request dengan alamat url yang salah) yang belum terdefinisikan akan diarahkan ke function error handling tersebut [[1]](https://www.youtube.com/watch?v=9LEAyHG7GqI&list=PLwdv9eOjH5CZrEPvWIzJqdaPfeCny9urc&index=5) . Maka saat kita melakukan request dengan method apapun dan alamat url yang salah akan menghasilkan response status 404 dan body response:

```
{
    "error": "Tidak ditemukan"
}
```

## Reference

- [[1] Programmer Copy Paste](https://www.youtube.com/@ProgrammerCopyPaste)
- [[2] santrikoding.com](https://santrikoding.com/tutorial-expressjs-restful-api-4-insert-data-ke-database)
