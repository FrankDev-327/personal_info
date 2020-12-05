'use strict';

var express = require('express');
var { DatosRepControll } = require('../../controllers/index');
var route = express.Router();

route.post('/datosrespo-create', DatosRepControll.createDatosResponsable);
route.get('/datosrespo-view/', DatosRepControll.viewMyDatosResponsable);
route.get('/datosrespo-lists/', DatosRepControll.listsDatosResponsable);
route.put('/datosrespo-update/:_id', DatosRepControll.updateDatosResponsable);

module.exports = route
