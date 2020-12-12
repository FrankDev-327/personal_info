'use strict';

var express = require('express');
var {
    TipoPersonaControll
} = require('../../controllers/index');
var routes = express.Router();

routes.post('/tipo-persona-create/', TipoPersonaControll.createTipoPersona)
routes.get('/tipo-persona-lists/', TipoPersonaControll.listTipoPersona)

module.exports = routes;
