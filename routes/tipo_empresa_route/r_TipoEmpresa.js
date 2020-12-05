'use strict';

var express = require('express');
var { TipoEmpresaControll } = require('../../controllers/index');
var routes = express.Router();

routes.post('/tipo-empresa-create/',  TipoEmpresaControll.createTipoEmpresa)
routes.get('/tipo-empresa-lists/',  TipoEmpresaControll.listTipoEmpresa);

module.exports = routes;