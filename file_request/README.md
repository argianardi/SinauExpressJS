# File Request

## Local Server

- instal body-parser, multer dan cors dengan cara:

  ```
  npm i body-parser multer cors
  ```

  - Cors digunakan untuk mengizinkan akser antar domain.
  - Multer digunakan untuk menghandle proses upload file di di nodejs
    multer membuatuhkan destinasi storage. dengan destinasi storage kita bisa mengatur destinasi folder uploadnya dan kita jugas bisa mengatur/mengcustom file name uploadnya

- import express, body-parser, multer dan cors

```
//-------------------------------------------------------------
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
//-------------------------------------------------------------

const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send(`Hello guys`);
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`App is runing on http://localhost:${port}`);
});
```

- Buat multer bungkus dalam sebuah variable (di contoh variable upload), panggil function multer dan pilih option storage.

```
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");

const app = express();
const port = 8000;

//-------------------------------------------------------------
const upload = multer({ storage });
//-------------------------------------------------------------
app.get("/", (req, res) => {
  res.send(`Hello guys`);
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`App is runing on http://localhost:${port}`);
});
```

- Atur storage pada multer, bagusnya dipisah di dalam variabel lain (di contoh didalam variabel storage ) dan Selanjutnya import package path.

  - destination <br>
    digunakan untuk mengatur lokasi penyimpanan file yang diupload
  - filename <br>
    digunakan untuk mengatur nama file pada file yang diupload. `path.parse(file.originalname).name` digunakan untuk mengambil nama file yang diupload. `"-" + Date.now() + path.extname(file.originalname)` digunakan untuk menambahkan strip/dash(-) tanggal upload dan extensi file yang diupload.

  ```
  const express = require("express");
  const bodyParser = require("body-parser");
  const multer = require("multer");
  const cors = require("cors");
  //----------------------------------------------------------
  const path = require("path");
  //----------------------------------------------------------
  const app = express();
  const port = 8000;

  //----------------------------------------------------------
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
        cb(
        null,
        path.parse(file.originalname).name +
            "_" +
            Date.now() +
            path.extname(file.originalname)
        );
    },
  });
  //----------------------------------------------------------

  const upload = multer({ storage });

  app.get("/", (req, res) => {
    res.send(`Hello guys`);
  });

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`App is runing on http://localhost:${port}`);
  });

  ```

- buat folder sesuai dengan lokasi penyimpanan file yang kita set (./public/uploads) jadi buat folder public kemudian di dalamnya buat folder lagi bernama uploads

- buat request api untuk upload file menggunakan mehtod post dan di dalamnya letakkan middleware multer yang kita buat tadi (di contoh diberi nama upload).

  ```
  app.post("/api/upload", upload.single('photo'), (req, res) => {

  })
  ```

  - upload adalah nama midleware multer yang kita buat tadi
  - single artinya kita hanya dapat mengupload file tunggal
  - photo artinya nama key di body requestnya nanti adalah photo

```
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 8000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "_" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send(`Hello guys`);
});

//----------------------------------------------------------------
app.post("/api/upload", upload.single("photo"), (req, res) => {
  //membuat url gambar
  let finalImageURL =
    req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
  res.json({ status: "success", image: finalImageURL });
});
//----------------------------------------------------------------

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`App is runing on http://localhost:${port}`);
});
```

- Buat middleware untuk body Parser dan static file. Static file berfungsi untuk membuat folder penyimpanan file upload bisa diakses.

  ```
  const express = require("express");
  const bodyParser = require("body-parser");
  const multer = require("multer");
  const cors = require("cors");
  const path = require("path");

  const app = express();
  const port = 8000;

  //--------------------------------------------------------
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));
  //--------------------------------------------------------

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
        cb(
        null,
        path.parse(file.originalname).name +
            "_" +
            Date.now() +
            path.extname(file.originalname)
        );
    },
  });

  const upload = multer({ storage });

  app.get("/", (req, res) => {
    res.send(`Hello guys`);
  });

  app.post("/api/upload", upload.single("photo"), (req, res) => {
    //membuat url gambar
    let finalImageURL =
        req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
    res.json({ status: "success", image: finalImageURL });
  });

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`App is runing on http://localhost:${port}`);
  });

  ```

  <small> `__dirname` di middleware static file itu maksudnya adalah root folder penyimpanan file upload nantinya akan di join dengan folder apa (di contoh ini dijoin dengan folder public). </small>

  Sehingga saat kita melakukan request post di postman, dengan cara upload file menggunakan form-data akan menghasilkan status 200 dan respon json seperti ini:

  ```
  {
    "status": "success",
    "image": "http://localhost:8000/uploads/loading_1671728092648.gif"
  }
  ```

  Dan jika kita lihat di folder public/uploads sudah ada masuk file yang kita upload.
