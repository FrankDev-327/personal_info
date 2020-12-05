'use strict';

const set = require('./settings/config');
const express = require('express');
const app = express();
var cors = require('cors')
const bodyParser = require('body-parser');

const {
    route_user,
    router_tipo_persona,
    route_empresa,
    route_tipo_contacto,
    route_datos_resp,
    route_tipo_empresa,
} = require('./routes/index');

/******************************************************************/
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(require('morgan')('dev'));

app.use((req, res, next) => {
    res.header('Content-Type:image/png');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY,Origin,X-Rquested-Widht,' + 'Content-Type,Accept,Acces-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

/************************************************/

app.use(set.path, route_user);
app.use(set.path, router_tipo_persona);
app.use(set.path, route_empresa)
app.use(set.path, route_tipo_contacto);
app.use(set.path, route_datos_resp);
app.use(set.path, route_tipo_empresa);


/************************************************/

process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error');
    console.log(err);
});

module.exports = app
