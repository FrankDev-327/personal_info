'use strict';

const {TipoPersonaModdel} = require('../../models/index');

async function createTipoPersona(req, res) {
    try {
        var param = req.body;
        var tipo_persona = new TipoPersonaModdel(param);
        var data = await tipo_persona.save();

        if (data === null) {
            return res.status(200).json({code: 'API_TP_403', message: 'Fallo al registrar tipo persona'});
        }

        return res.status(200).json({data, code: 'API_TP_200', message: 'Creación de Tipo de Persona.'});

    } catch (error) {
        console.log(error);
        return res.status(200).json({code: 'API_TP_500', message: 'Ha ocurrido un error en crear tipo persona.'});
    }
}

async function listTipoPersona(req, res) {
    try {
        var data = await TipoPersonaModdel.find().exec();
        if (data === null || data.length <= 0) {
            return res.status(200).json({code: 'API_TP_403', message: 'Fallo al mostrar los tipos de persona. '});
        }

        return res.status(200).json({data, code: 'API_TP_200', message: ' Listado de tipos de personsa.'});
    } catch (error) {
        console.log(error);
        return res.status(200).json({code: 'API_TP_500', message: 'Ha ocurrido un error en listar tipo personas..'});
    }
}

module.exports = {
    createTipoPersona,
    listTipoPersona

}
