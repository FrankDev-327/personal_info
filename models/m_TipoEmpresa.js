'use strict';

const mongoose = require('mongoose')
var Shcema = mongoose.Schema;
var TipoEmpresaModdel = Shcema({
    tipo_empresa: { type: String, require: true },
    creadoPor:{ type: String },
    actualizadoPor:{ type: String },
    fechacreacion: { type: Date, default: new Date() },
    fechamodificacion: { type: Date, default: new Date() },
});
var TipoPersona = mongoose.model('TipoEmpresas', TipoEmpresaModdel);
module.exports = TipoPersona;