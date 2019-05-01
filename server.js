const express = require("express");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 2000;

app.get("/", (req, res) => {
  res.send("hello friend");
});

app.listen(port, () =>
  console.log(`servidor corriendo en el puerto ${port}`)
);
