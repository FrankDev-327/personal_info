'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  SuscribersModel = Schema({
    foto_perfil: { type: String },
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    contrasena: { type: String, required: true, trim: true },
    correo: { type: String, required: true, unique: true, trim: true },
    id_estado: { type: Boolean, default: true }
  }),
  Suscribers = mongoose.model('Suscribers', SuscribersModel);

module.exports = Suscribers;