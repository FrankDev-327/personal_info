'use strict';

var express = require('express');
var {
    TipoPersonaControll
} = require('../../controllers/index');
var routes = express.Router();

routes.post('/tipo-persona-create/', decodeApply.autenticacion, TipoPersonaControll.createTipoPersona)
routes.get('/tipo-persona-lists/', decodeApply.autenticacion, TipoPersonaControll.listTipoPersona)

module.exports = routes;
