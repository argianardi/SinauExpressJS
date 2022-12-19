# Middleware

Fungsi middleware adalah fungsi yang memiliki akses ke request object (req), response object (res) dan next function dalam siklus request-response aplikasi.
next function adalah fungsi di router Express yang ketika dipanggil, mengeksekusi middleware untuk menggantikan middleware yang saat sedang dijalankan [[1]](http://expressjs.com/en/guide/writing-middleware.html).

Fungsi middleware dapat melakukan tugas-tugas berikut [[1]](http://expressjs.com/en/guide/writing-middleware.html):

- Menjalankan kode apa pun.
- Merubah object request dan response.
- Mengakhiri siklus request-response.
- Menjalankan middleware next untuk melanjutkan ke proses berikutnya.

Jika fungsi middleware saat ini tidak mengakhiri siklus request-response, ia harus memanggil next() untuk meneruskan kontrol ke fungsi middleware berikutnya. Jika tidak, permintaan akan menggantung [[1]](http://expressjs.com/en/guide/writing-middleware.html). Berikut menunjukkan elemen - elemen pemanggilan fungsi middleware [[1]](http://expressjs.com/en/guide/writing-middleware.html): <br>

![elemen middleware](/img/elemenMiddleware.png)

Untuk memahami middleware kita akan bahas 3 contoh perikut [[1]](http://expressjs.com/en/guide/writing-middleware.html):

- ### Middleware function myLogger

Ini adalah contoh sederhana dari fungsi middleware bernama "myLogger". Fungsi ini hanya mencetak "LOGGED" saat request ke aplikasi melewatinya. Fungsi middleware dideklarasikan ke variabel bernama myLogger.

```
  const express = require("express");
  const app = express();

  const port = 3003;

//------------------------------------------

  const myLogger = function (req, res, next) {
    console.log("Logged");
    next();
  };

//------------------------------------------

  app.listen(port, function () {
    console.log(`server ${port} is okay`);
  });

```

Untuk menjalankan fungsi middleware, harus dipanggil dengan format code `app.use(nama_function_middleware)`.Sehingga codenya menjadi seperti ini:

```

const express = require("express");
const app = express();

const port = 3003;

const myLogger = function (req, res, next) {
   console.log("Logged");
   next();
};

//------------------------------------------
app.use(myLogger);
//------------------------------------------

app.listen(port, function () {
   console.log(`server ${port} is okay`);
});
```

Setelah function middleware dipanggil baru kita masukkan task berikutnya. Misalnya,task route ke root path (/).

```
const express = require("express");
const app = express();

const port = 3003;

const myLogger = function (req, res, next) {
  console.log("Logged");
  next();
};

app.use(myLogger);

//------------------------------------------

app.get("/", (req, res) => {
  res.send("Hallo World");
  console.log("hello");
});

//------------------------------------------

app.listen(port, function () {
  console.log(`server ${port} is okay`);
});
```

Setiap kali app menerima request, perintah `console.log("Logged")` dan `console.log('hello')` akan dijalankan. Simpelnya setiap kali port/browser direload maka perintah dalam function middleware (perintah `console.log('Logged')`) dijalankan.

Urutan pemuatan middleware penting: fungsi middleware yang dimuat pertama juga akan dijalankan terlebih dahulu.

Jika function middleware myLogger dibuat setelah task route ke root path (/) (`function app.get("/"......`), permintaan tidak akan pernah mencapainya dan app tidak akan mencetak "LOGGED", karena penangan rute dari jalur root menghentikan siklus permintaan-respons.

- ### Middleware function requestTime
  Selanjutnya, kita akan membuat fungsi middleware bernama "requestTime" dan menambahkan properti requestTime ke objek request.

```
express = require("express");
const app = express();

const port = 3003;

// ------------------ middleware function ------------------
const requestTime = function (req, res, next) {
  req.requestTime = new Date();
  next();
};

// ------------------ Call middleware function ------------------
app.use(requestTime);

app.get("/", function (req, res) {
  let responseText = "Hello world <br>";
  responseText += `<small>Request at: ${req.requestTime}</small>`;
  res.send(responseText);
});

app.listen(port, () => {
  console.log(`Server ${port} is okay`);
});
```

Setiap kali kita melakukan request ke root app (browser direload), aplikasi akan menampilkan nilai timestap secara real time di browser.

## Reference

- [[1] expressjs.com](http://expressjs.com/en/guide/writing-middleware.html)

[[1]](http://expressjs.com/en/guide/writing-middleware.html)
