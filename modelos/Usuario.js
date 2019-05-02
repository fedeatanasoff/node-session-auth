const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const usuarioSchema = new Schema(
  {
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true },
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
    if (error) {
      next(error);
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

usuarioSchema.methods.compararPasswords = function(password, callback) {
  bcrypt.compare(password, this.password, (err, sonIguales) => {
    if (err) return callback(err);

    callback(null, sonIguales);
  });
};

module.exports = mongoose.model("Usuario", usuarioSchema);
