const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const Usuario = require("./modelos/Usuario");

// * app
const app = express();
const port = process.env.PORT || 2000;
const MONGO_URL = "mongodb://127.0.0.1:27017/auth";

// * mongoose conexion
mongoose.connect(MONGO_URL, { useCreateIndex: true, useNewUrlParser: true });
mongoose.connection.on("error", err => {
  throw err;
  process.exit(1);
});

const user = new Usuario({
  email: "ok@node.com",
  password: "pass",
  nombre: "Fede"
});

user
  .save()
  .then(() => console.log("guardado"))
  .catch(err => console.log(err));

// * conexion mongo store con sessiones
app.use(
  session({
    secret: "secreto!",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      url: MONGO_URL,
      autoReconnect: true
    })
  })
);

app.get("/", (req, res) => {
  req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
  res.send(
    `hello friend. has visitado esta pagina ${req.session.cuenta} veces`
  );
});

app.listen(port, () => console.log(`servidor corriendo en el puerto ${port}`));
