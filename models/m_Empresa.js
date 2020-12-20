'use strict'

var mongoose = require('mongoose')
var Schema   = mongoose.Schema;
    
var currentDate = function(){
    var timeObject = new Date();
    timeObject.setHours( timeObject.getHours() - 5);
    return timeObject;
};

var EmpresaModel = new Schema({
    suscriptorId: { type: Schema.Types.ObjectId, ref:'Suscribers' },
    TipoPersona:{type: String, required: true },
    RasonSocial:{type: String, required: true },
    NombreComercial:{ type: String, trim: true, require:true },
    AvisoOperacion:{ type: String, trim: true, require:true },  
    RUC:{ type: String, require:true },
    TipoEmpresa: { type: String, require:true },
	fecha_creacion: { type: Date, default: currentDate()},
	fecha_modificacion: { type: Date, default: currentDate()},
});
module.exports = mongoose.model('Empresas', EmpresaModel);
