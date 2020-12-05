'use strict';

var {
    TipoContactoModel
} = require('../../models/index');

async function CreateTipoContacto(req, res) {
    try {
        var tipoContacto = new TipoContactoModel();
        var paramsTipoContacto = req.body;

        tipoContacto.tipo_contacto = paramsTipoContacto.tipo_contacto;
        tipoContacto.fecha_creacion = new Date().toISOString();
        tipoContacto.fecha_modificacion = new Date().toISOString();

        var data = await tipoContacto.save();

        if (! data || data === null || data.length <= 0) {
            return res.status(200).json({code: 'API_CON_403', message: 'Fallo al registrar el tipo de contacto'});
        }
        return res.status(200).json({data, code: 'API_CON_200', message: 'Tipo de contacto registrado'});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function UpdateTipoContacto(req, res) {
    try {
        var id = {
            _id: req.params.id
        }
        const ng = {
            new: true
        }
        var data = await TipoContactoModel.findOneAndUpdate(id, req.body, ng);
        if (data == null) {
            return res.status(403).json({code: 'API_CON_403', message: 'No se puedo actualizar Tipo de Contacto'});
        }

        return res.status(200).json({data, code: 'API_CON_200', message: 'No se puedo actualizar Tipo de Contacto'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function ListsTiposContactos(req, res) {
    try {
        var data = await TipoContactoModel.find().exec();
        if (! data || data == null || data.length <= 0) {
            return res.status(200).json({code: 'API_CON_403', message: 'No hay registros de Tipo de Contactos'});
        }
        return res.status(200).json({data, code: 'API_CON_200', message: 'Listado de tipos de contactos.'});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function ViewTipoContacto(req, res) {
    try {
        var idTipConcacto = {
            _id: req.params.id
        }
        var requestViewTipoContacto = await Tipos_Contacto.findById(idTipConcacto);
        if (! requestViewTipoContacto) 
            res.status(403).json({message: 'No existe registro de ese Tipo de Contacto'});
         else 
            res.status(200).json({requestViewTipoContacto});
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function DeleteTipoContacto(req, res) {
    try {
        var idTipConcacto = {
            _id: req.params.id
        }
        var requestDelete = await Tipos_Contacto.findOneAndDelete(idTipConcacto);
        if (! requestDelete) 
            res.status(403).json({message: 'Falló el eliminar un Tipo de Contacto'});
         else 
            res.status(200).json({requestDelete});
        


    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    CreateTipoContacto,
    UpdateTipoContacto,
    ListsTiposContactos,
    ViewTipoContacto,
    DeleteTipoContacto
}
