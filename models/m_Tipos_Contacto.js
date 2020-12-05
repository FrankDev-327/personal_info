'use strict'

var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;
var Tipos_ContactoSchema = new Schema({
	tipo_contacto: { type: String, required: true, trim: true  },
	fecha_creacion: { type: Date, required: true, default: new Date().toISOString() },
	fecha_modificacion: { type: Date, required: true, default: new Date().toISOString() },
});
module.exports = mongoose.model('Tipos_Contacto', Tipos_ContactoSchema);


