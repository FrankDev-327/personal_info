'use strict';

const {DatosResponsableModel} = require('../../models/index');

async function createDatosResponsable(req, res) {
    try {
        var data;
        var params = req.body;
        var susId = {
            suscriptorId: req.suscriber._id
        };
        var info = await DatosResponsableModel.findOne(susId).exec();

        if (info !== null) {
            const ng = {
                new: true
            };
            var _id = {
                _id: info._id
            };
            var setUpdate = {
                suscriptorId: req.suscriber._id,
                PrimerNombre: params.PrimerNombre,
                Segundonombre: params.Segundonombre,
                ApellidoPaterno: params.ApellidoPaterno,
                ApellidoMatero: params.ApellidoMatero,
                ApellidoCasado: params.ApellidoCasado,
                CedulaPasaporte: params.CedulaPasaporte,
                RepresentanteLegal: params.RepresentanteLegal,
                DV: params.PrimerNDVombre,
                Nacionalidad: params.Nacionalidad
            }

            data = await DatosResponsableModel.findOneAndUpdate(_id, setUpdate, ng);
            return res.status(200).json({data, message: 'Datos del responsable.', code: 'API_DR_200'});
        }

        var sus = new DatosResponsableModel();
        sus.suscriptorId = req.suscriber._id;
        sus.PrimerNombre = params.PrimerNombre
        sus.Segundonombre = params.Segundonombre
        sus.ApellidoPaterno = params.ApellidoPaterno
        sus.ApellidoMatero = params.ApellidoMatero
        sus.ApellidoCasado = params.ApellidoCasado
        sus.CedulaPasaporte = params.CedulaPasaporte
        sus.RepresentanteLegal = params.RepresentanteLegal
        sus.DV = params.PrimerNDVombre
        sus.Nacionalidad = params.Nacionalidad

        data = await sus.save();

        if (data !== null) {
            return res.status(200).json({data, message: 'Información almacenada con éxito.', code: 'API_DR_200'});
        }

        return res.status(200).json({message: 'Algo pasó al almacenar la información.', code: 'API_DR_403'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message, message: 'Error en createDatosResponsable', code: 'API_DR_500'});
    }
}

async function viewMyDatosResponsable(req, res) {
    try {
        var susId = {
            suscriptorId: req.suscriber._id
        };
        var data = await DatosResponsableModel.findOne(susId).exec();

        if (data !== null) {
            return res.status(200).json({data, message: 'Información sobre el responsable.', code: 'API_DR_200'});
        }

        return res.status(200).json({message: 'Algo pasó al almacenar la información.', code: 'API_DR_403'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message, message: 'Error en viewMyDatosResponsable', code: 'API_DR_500'});
    }
}

async function listsDatosResponsable(req, res) {
    try {
        var data = await DatosResponsableModel.find({});

        if (data !== null && data.length > 0) {
            return res.status(200).json({data, message: 'Listado de datos personales.', code: 'API_DR_200'});
        }

        return res.status(200).json({message: 'Algo pasó al mostrar la información.', code: 'API_DR_403'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message, message: 'Error en viewMyDatosResponsable', code: 'API_DR_500'});
    }
}

async function updateDatosResponsable(req, res) {
    try {
        var params = req.body;
        const newRg = {
            new: true
        };
        var _id = {
            _id: req.params._id
        };
        var setUpdate = {
            PrimerNombre: params.PrimerNombre,
            Segundonombre: params.Segundonombre,
            ApellidoPaterno: params.ApellidoPaterno,
            ApellidoMatero: params.ApellidoMatero,
            ApellidoCasado: params.ApellidoCasado,
            CedulaPasaporte: params.CedulaPasaporte,
            RepresentanteLegal: params.RepresentanteLegal,
            DV: params.DV,
            Nacionalidad: params.Nacionalidad
        }
        var data = await DatosResponsableModel.findOneAndUpdate(_id, setUpdate, newRg);
        console.log(data)
        if (data !== null) {
            return res.status(200).json({data, message: 'Información sobre el responsable actulizado con éxito.', code: 'API_DR_200'});
        }

        return res.status(200).json({message: 'Algo pasó al actualizar la información.', code: 'API_DR_403'});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message, message: 'Error en updateDatosResponsable', code: 'API_DR_500'});
    }
}

module.exports = {
    createDatosResponsable,
    viewMyDatosResponsable,
    listsDatosResponsable,
    updateDatosResponsable

}
