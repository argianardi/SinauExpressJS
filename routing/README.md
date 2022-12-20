# Routing

Routing adalah cara menentukan bagaimana aplikasi meresponse permintaan klien ke endpoint tertentu yang merupakan URL (atau jalur) dan metode HTTP request tertentu (GET, POST, dan sebagainya). Router didefinisikan menggunakan:

```
app.METHOD(PATH, HANDLER)
```

Dimana,

- app adalah turunan dari express.
- METODE adalah metode permintaan HTTP, dibuat dengan huruf kecil.
- PATH adalah jalur di server.
- HANDLER adalah fungsi yang dijalankan saat rute cocok.

Routing Method ini menentukan callback function (terkadang disebut "handler function") yang dipanggil saat aplikasi menerima permintaan ke rute yang ditentukan (endpoint) dan metode HTTP. Dengan kata lain, aplikasi "listen" permintaan yang cocok dengan rute dan metode yang ditentukan, dan ketika mendeteksi kecocokan, aplikasi memanggil fungsi callback yang ditentukan.

Dalam pengaplikasiannya, routing method dapat memiliki lebih dari satu fungsi callback sebagai argumen. Dengan beberapa fungsi callback, penting untuk menyediakan next sebagai argumen ke fungsi callback dan kemudian memanggil next() di dalam isi fungsi untuk menyerahkan kontrol ke callback berikutnya.

### Route Parameters

Route Parameter disebut segmen URL yang digunakan untuk menangkap value yang ditentukan pada posisinya di URL. Value yang diambil diisi dalam objek req.params, dengan nama parameter rute yang ditentukan di jalur sebagai key-nya masing-masing.

```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```

Untuk menentukan rute dengan parameter rute, cukup tentukan parameter rute di path rute seperti yang ditunjukkan di bawah ini.

```
app.get("/users/:userId/books/:bookId", (request, response) => {
response.send(request.params);
});
```

Misalnya jika kita masukkan url `http://localhost:3001/users/2/books/3` di search bar browser, hasilnya akan seperti ini:

```
{"userId":"2","bookId":"3"}
```

<i>Note: Nama parameter rute hanya bisa terdiri dari “karakter kata” ([A-Z a-z 0-9 _]).</i>

### Response Methods

Metode pada objek respons (res) dalam tabel berikut dapat mengirimkan respons ke klien, dan mengakhiri siklus respons-permintaan. Jika tidak ada metode ini yang dipanggil dari route handler, permintaan klien akan dibiarkan menggantung.

| Deskripsi        | Metode                                                                                 |
| ---------------- | -------------------------------------------------------------------------------------- |
| res.download()   | Meminta file untuk diunduh.                                                            |
| res.end()        | Mengakhiri proses respons.                                                             |
| res.json()       | Mengirim respons JSON.                                                                 |
| res.jsonp()      | Mengirim respons JSON dengan dukungan JSONP.                                           |
| res.redirect()   | Mengarahkan permintaan atau berpindah ke halaman yang ingin dituju.                    |
| res.render()     | Merender template tampilan.                                                            |
| res.send()       | Mengirim response dari berbagai type.                                                  |
| res.sendFile()   | Mengirim file sebagai aliran oktet.                                                    |
| res.sendStatus() | Menetapkan kode status respons dan kirim representasi stringnya sebagai badan respons. |

#### res.json()

Berikut contoh penggunaannya untuk response json:

```
const express = require("express");
const app = express();
const port = 5001;

app.get("/", (req, res) => {
  const akatsuki = {
    id: 1,
    name: "Pain",
  };
  res.json(akatsuki);
});

app.listen(port, () => {
  console.log(`${port} is runing...`);
});
```

Jika kita buka `http://localhost:5001/`
hasilnya akan seperti ini:

```
{"id":1,"name":"Pain"}
```

#### res.redirect()

Berikut contoh penggunaan redirect:

```
const express = require("express");
const app = express();
const port = 5001;

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/about", (req, res) => {
  res.redirect("http://expressjs.com/");
});

app.listen(port, () => {
  console.log(`Server ${port} is runing...`);
});
```

Sehingga saat kita berpindah ke route `http://localhost:5001/about` kita langsung di-direct ke website expressJS

### app.route()

Digunakan untuk menggabungkan lebih dari satu methode request (get, post, put dan delete) dalam satu path route (url) yang sama. Berikut contoh penggunaannya:

```
const express = require("express");
const app = express();
const port = 5001;

app.get("/", (req, res) => {
  res.send("Home");
});

app
  .route("/books")
  .get((req, res) => {
    res.send("get books");
  })
  .post((req, res) => {
    res.send("post books");
  })
  .put((req, res) => {
    res.send("put books");
  })
  .delete((req, res) => {
    res.send("delete books");
  });

app.listen(port, () => {
  console.log(`Server ${port} is runing...`);
});
```

Sehiggga saat kita menggunakan postmat dan menjalankan:

- method get di url `http://localhost:5001/books` akan menghasilkan <b>get books</b>
- method post di url `http://localhost:5001/books` akan menghasilkan <b> post books </b>
- method put di url `http://localhost:5001/books` akan menghasilkan <b>put books </b>
- method delete di url `http://localhost:5001/books` akan menghasilkan <b>delete books</b>

### Express Router

Digunakan untuk membuat router modular.
pertama kita harus import module express menggunakan require

```
const express = require('express');
```

Setelah itu instant `express.Route()` kedalam sebuah variabel (di contoh router)

```
const router = express.Router();
```

Selanjutnya gunakan variabel router express tadi untuk membuat request router. Contohnya kita membuat reqest router untuk CRUD user:

```
router
  .route("/users")
  .get((req, res) => {
    res.send("get users");
  })
  .post((req, res) => {
    res.send("post users");
  });

router
  .route("/user/:userId")
  .put((req, res) => {
    res.send("put user");
  })
  .delete((req, res) => {
    res.send("delete user");
  });
```

Terakhir kita export modul router yang kita buat

```
module.exports = router;
```

Berikut code lengkapnya:

```
const express = require("express");
const app = express();
const router = express.Router();

router
  .route("/users")
  .get((req, res) => {
    res.send("get users");
  })
  .post((req, res) => {
    res.send("post users");
  });

router
  .route("/user/:userId")
  .put((req, res) => {
    res.send("put user");
  })
  .delete((req, res) => {
    res.send("delete user");
  });

module.exports = router;
```

Setelah itu baru kita bisa gunakan modul router yang kita buat tadi untuk bagian lain di file yang berbeda. Pertama kita harus import modul router yang kita buat tersebut menggunakan require, arahkan ke lokasi penyimpanan module router tersebut dan simpan dalam sebuah variabel (di contoh userRouter).
Kemudian untuk bisa menjalankannya panggil modul router dengan format code:

```
app.use(userRouter);
```

Dimana,

- app adalah turunan dari express
- userRouter adalah nama variabel yang menyimpan module router

Berikut code lengkapanya:

```
const express = require("express");
const app = express();
const userRouter = require("./userRouter");
const port = 5001;

app.use(userRouter);

app.listen(port, () => {
  console.log(`Server ${port} is runing...`);
});
```
