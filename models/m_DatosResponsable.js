'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DatosResponsableModel = Schema({
    suscriptorId :{ type: String, /* required: true, */  },
    PrimerNombre: { type: String, /* required: true, */ },
    Segundonombre: { type: String, /* required: true, */ trim: true },
    ApellidoPaterno: { type: String, /* required: true, */ trim: true },
    ApellidoMatero: { type: String, /* required: true, */ trim: true },
    ApellidoCasado: { type: String, /* required: true, */ unique: true, trim: true },
    CedulaPasaporte: { type: String, /* required: true, */ unique: true, trim: true },
    RepresentanteLegal: { type: String, /* required: true, */ unique: true, trim: true },
    DV: { type: String, /* required: true, */ unique: true, trim: true },
    Nacionalidad: { type: String, /* required: true, */ unique: true, trim: true },
  });
var DatosResp = mongoose.model('DatosResponsables', DatosResponsableModel);
////
module.exports = DatosResp;