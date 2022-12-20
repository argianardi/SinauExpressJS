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
