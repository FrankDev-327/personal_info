'use strict';

const {TipoEmpresaModel} = require('../../models/index');

async function createTipoEmpresa(req, res) {
    try {
        var param = req.body;
        var tipo_persona = new TipoEmpresaModel(param);
        var data = await tipo_persona.save();

        if (data === null || data.length <= 0) {
            return res.status(200).json({code: 'API_TE_403', message: 'Fallo al registrar tipo de empresa'});
        }

        return res.status(200).json({data, code: 'API_TE_200', message: 'Creación de Tipo de Empresa.'});

    } catch (error) {
        console.log(error);
        return res.status(200).json({code: 'API_TE_500', message: 'Ha ocurrido un error en crear tipo de empresa.'});
    }
}

async function listTipoEmpresa(req, res) {
    try {
        var data = await TipoEmpresaModel.find().exec();

        if (data === null || data.length <= 0) {
            return res.status(200).json({code: 'API_TE_403', message: 'Fallo al mostrar los tipos de empresa. '});
        }

        return res.status(200).json({data, code: 'API_TE_200', message: ' Listado de tipos de empresa.'});
    } catch (error) {
        console.log(error);
        return res.status(200).json({code: 'API_TE_500', message: 'Ha ocurrido un error en listar tipo de empresa.'});
    }
}

module.exports = {
    createTipoEmpresa,
    listTipoEmpresa

}
