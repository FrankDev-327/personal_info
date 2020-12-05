'use strict';

const express = require('express');
var route = express.Router();
const connectParty = require('connect-multiparty');
const MultiParty = connectParty({
    uploadDir: 'suscriber-img'
});
var { SuscriberControll } = require('../../controllers/index');

// - La ruta de suscriber-create no debe llevar token
route.post('/suscriber-create/', SuscriberControll.createSuscribers);
route.post('/suscriber-login/', SuscriberControll.loginSuscribers);
route.put('/suscriber-update/:id',  SuscriberControll.updateSuscribers);

//Todavia me falta agregarle cosas a este método. No lo uses aún.
route.put('/suscriber-update-img/:id',  SuscriberControll.uploadPerfil);
route.get('/suscriber-view-profile',  SuscriberControll.showProfileSus);

module.exports = route;