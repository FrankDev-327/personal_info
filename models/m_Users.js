'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = Schema({
   nombre: { type: String, trim: true },
   provincia: { type: String, trim: true },
   apellido: { type: String, trim: true },
   contrasena: { type: String, trim: true },
   sexo: { type: String },
   numero_contactar: { type: String },
   correo: { type: String, unique: true },
   fecha_creacion: { type: Date, default: new Date().toISOString() },
   fecha_actualizacion: { type: Date, default: new Date().toISOString() },
   ultima_conexion: { type: Date, default: new Date().toISOString() },
   rubro: { type: Schema.Types.Mixed },
   sobre_mi: { type: String },
   sector: { type: String },
   estado: { type: Boolean, default: true },
   perfil: { type: String }
});

const User = mongoose.model('Users', UsersSchema);
module.exports = User


