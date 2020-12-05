'use strict';

var express = require('express');
var { EstadoUserControll } = require('../../controllers/index');
var api = express.Router();

api.post('/create-estado_users', EstadoUserControll.CreateEstadoContacto)
api.put('/update-estado_users/?id', EstadoUserControll.UpdateEstadoContacto)
api.get('/list-estado_users', EstadoUserControll.ListEstadoContacto)
api.get('/view-estado_users/?id', EstadoUserControll.ViewEstadoContacto)
api.put('/delete-estado_users/?id', EstadoUserControll.DeleteEstadoContacto)

module.exports = api
