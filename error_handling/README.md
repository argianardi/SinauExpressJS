# Error Handling

Error handling adalah proses di mana menangkap dan memproses error yang terjadi secara synchronous dan asynchronous.

Untuk memahaminya kita langsung bahas di contoh.
Buat code dibawah ini dan lakukan request berdasarkan url dibawah ini, Maka hasilnya akan error dengan message user is not defined.

```
const express = require("express");
const app = express();

app.get("/test", async (req, res) => {
  const name = user.name;
  return res.status(200).json({ succes: true });
});

app.listen(4000, () => {
  console.log(`Server 4000 is runing...`);
});
```

Kemudian jika kita mengubah code diatas dengan logika if seperti ini:

```
const express = require("express");
const app = express();

const getUser = () => undefined;

app.get("/test", async (req, res) => {
  const user = getUser();
  if (!user) {
    throw new Error("User not found");
  }
  return res.status(200).json({ succes: true });
});

app.listen(4000, () => {
  console.log(`Server 4000 is runing...`);
});
```

Hasilnya masih tetap error tetapi message errornya sesuai dengan yang kita buat yaitu User is not found. Kita bisa menghandle error (menambahkan task tertentu saat terjadi error) dengan cara menambahkan try catch block pada code diatas:

```
const express = require("express");
const app = express();

const getUser = () => undefined;

app.get("/test", async (req, res) => {
  try {
    const user = getUser();

    if (!user) {
      throw new Error("User not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
  return res.status(200).json({ succes: true });
});

app.listen(4000, () => {
  console.log(`Server 4000 is runing...`);
});
```

Dengan menambahkan try catch block diatas kita bisa menghandle error, yaitu saat terjadi error kita akan menjalankan task console.log(error) dan pada saat kita mencoba melakukan request di postman akan muncul status 400 dan message error yang kita buat(User not found).

## Error Handling dengan Middleware

Kita juga bisa membuat error handling menggunakan middleware. Di contoh ini kita gunakan middleware untuk error handling secara modular dan satu lagi middleware di code utama.

Pertama kita buat error handling middleware yang di jadikan modular (di contoh filenya bernama errorHandler.js):

```
const errorHandler = (error, req, res, next) => {
  return res.status(400).send(error.message);
};

module.exports = errorHandler;
```

Fungsi dari middleware di atas (errorHandler) untuk menampilkan status 400 dan menampilkan error message dari middleware di code utama saat user melakukan request di code utama tersebut. Selanjutnya kita buat middleware untuk code utama (di contoh filenya bernama errorHandlingEx2.js):

```
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const app = express();

const getUser = () => undefined;

app.get("/test", async (req, res, next) => {
  try {
    const user = getUser();

    if (!user) {
      throw new Error("User not found");
    }
  } catch (error) {
    return next(error);
  }
  return res.status(200).json({ succes: true });
});

app.use(errorHandler);

app.listen(4000, () => {
  console.log(`Server 4000 is runing...`);
});
```

Fungsi dari middleware di code utama ini adalah sebagai trigger untuk menjalankan middleware modular yang kita buat tadi (errorHandler) untuk menampilkan response 400 dan error message. Dimana trigger tersebut dilakukan melalui method next yang di jalankan di block catch:

```
  } catch (error) {
    return next(error);
  }
```

Artinya saat terjadi error jalankan middleware selanjutnya, yaitu middleware modular tadi (errorHandler) yang dipanggil melaui app `app.use(errorHandler);` untuk menampilkan status 400 dan error message.
