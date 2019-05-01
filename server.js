const express = require("express");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 2000;

app.use(
  session({
    secret: "secreto!",
    resave: true,
    saveUninitialized: true
  })
);

app.get("/", (req, res) => {
  req.session.cuenta = req.session.cuenta
    ? req.session.cuenta + 1
    : 1;
  res.send(
    `hello friend. has visitado esta pagina ${
      req.session.cuenta
    } veces`
  );
});

app.listen(port, () =>
  console.log(`servidor corriendo en el puerto ${port}`)
);
