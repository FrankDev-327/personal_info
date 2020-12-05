'use strict';

var express = require('express');
var {
    TipoContactoControll
} = require('../../controllers/index');
var api = express.Router();

api.post('/create-tipos_contacto', TipoContactoControll.CreateTipoContacto);
api.get('/list-tipos_contacto', TipoContactoControll.ListsTiposContactos);

api.put('/update-tipos_contacto/?id', TipoContactoControll.UpdateTipoContacto);
api.get('/view-tipos_contacto/?id', TipoContactoControll.ViewTipoContacto);
api.put('/delete-tipos_contacto/?id', TipoContactoControll.DeleteTipoContacto);

module.exports = api
