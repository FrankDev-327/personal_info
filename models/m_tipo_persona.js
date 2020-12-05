'use strict';

const mongoose = require('mongoose')
var Shcema = mongoose.Schema;
var TipoPersonaModdel = Shcema({
    tipo_persona: { type: String, require: true },
    status: { type: Boolean },
    creadoPor:{ type: String },
    actualizadoPor:{ type: String },
    fechacreacion: { type: Date, default: new Date() },
    fechamodificacion: { type: Date, default: new Date() },
});
var TipoPersona = mongoose.model('TipoPersona', TipoPersonaModdel);
module.exports = TipoPersona;