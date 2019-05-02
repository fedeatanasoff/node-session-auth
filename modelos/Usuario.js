const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const usuarioSchema = new Schema(
  {
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: string, required: true },
    nombre: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

usuarioSchema.pre("save", function(next) {
  const usuario = this;
  // cambio la contraseña?
  if (!usuario.isModified("password")) {
    return next();
  }

  //   genero una salt
  bcrypt.genSalt(10, (error, salt) => {
    if (err) {
      next(err);
    }

    // utilizo la salt y genero una ueva contraseña
    // a traves del hash y sustituyo
    bcrypt.hash(usuario.password, salt, null, (err, hash) => {
      if (err) {
        next(err);
      }

      usuario.password = hash;
      next();
    });
  });
});
