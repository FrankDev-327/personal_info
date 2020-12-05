'use strict';

var express = require('express');
var { EmpresaControll } = require('../../controllers/index');
var api = express.Router();

api.post('/empresa_create/', EmpresaControll.createMyEnterprise);
api.put('/empresa_update/:_id', EmpresaControll.updateMyEnterprise);
api.get('/empresa_view/', EmpresaControll.viewMyEnterprise);

//en veremos por si ocurre algún cambio drastico
api.get('/empresa_lists/', EmpresaControll.listsMyEnterprise); 

module.exports = api
