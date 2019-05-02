const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
