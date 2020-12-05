'use strict';

const express = require('express');
var { UserControll } = require('../../controllers/index');
//const multipart = require('connect-multiparty');
//const multipartRoute = multipart({ uploadDir: 'user-image' });
const api = express.Router();

api.post('/user-create',  UserControll.CreateUsers);
api.put('/user-update/:id',  UserControll.UpdateUsers);

api.post('/user-login/',  UserControll.LoginUsers);
api.get('/user-view/:id',  UserControll.ViewUser);

api.put('/user-img-profile/:id', UserControll.uploadPerfil);

module.exports = api