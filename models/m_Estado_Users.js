'use strict'

var mongoose = require('mongoose'),
var Schema   = mongoose.Schema
var EstadoUsersModel = new Schema({
	estado: { type: String, required: true, trim: true, },
	fecha_creacion: { type: Date, required: true, default: new Date().toISOString() },
	fecha_modificacion: { type: Date, required: true },
});
module.exports = mongoose.model('Estado_Users', EstadoUsersModel);


