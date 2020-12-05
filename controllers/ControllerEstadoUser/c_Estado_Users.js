'use strict';

var {
    EstadoUsersModel
} = require('../../models/index');

async function CreateEstadoContacto(req, res) {
    var estado_user = new EstadoUsersModel();
    try {
        estado_user.estado = req.body.estado;
        estado_user.fecha_creacion = new Date.now();
        estado_user.fecha_modificacion = new Date.now();

        var SaveEstado = await estado_user.save();
        if (! SaveEstado) 
            res.status(403).json({message: 'Error al registar el estado'});
         else 
            res.status(200).json({SaveEstado});
        

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function UpdateEstadoContacto(req, res) {
    var idEstado = {
        _id: req.params.id
    }
    try {
        var requestEstadoUpdate = await EstadoUsersModel.findByIdAndUpdate(idEstado, req, body, {new: true});
        if (! requestEstadoUpdate) 
            res.status(403).json({message: 'Error al actualizar el estado'});
         else 
            res.status(200).json({requestEstadoUpdate});
        

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function ListEstadoContacto(req, res) {
    var idEstado = {
        _id: req.params.id
    }
    try {
        var requestEstadoList = await EstadoUsersModel.find(idEstado).exec();
        if (! requestEstadoList) 
            res.status(403).json({message: 'No hay dato relacionado'});
         else 
            res.status(200).json({requestEstadoList});
        

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function ViewEstadoContacto(req, res) {
    try {
        var requestEstadoView = await EstadoUsersModel.find({});
        if (! requestEstadoView) 
            res.status(403).json({message: 'No hay datos relacionados'});
         else 
            res.status(200).json({requestEstadoView});
        

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function DeleteEstadoContacto(req, res) {
    var idEstado = {
        _id: req.params.id
    }
    try {
        var requestEstadoDelete = await EstadoUsersModel.findByIdAndDelete(idEstado);
        if (! requestEstadoDelete) 
            res.status(403).json({message: 'No hay datos relacionados'});
         else 
            res.status(200).json({requestEstadoDelete});
        

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    CreateEstadoContacto,
    UpdateEstadoContacto,
    ListEstadoContacto,
    ViewEstadoContacto,
    DeleteEstadoContacto
}
