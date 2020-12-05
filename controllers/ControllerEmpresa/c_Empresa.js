'use strict';

var { EmpresaModel } = require('../../models/index');

async function createMyEnterprise(req, res) {
    try {
        var data;
        var params = req.body;
        console.log(params)
        var enterprise = new EmpresaModel();
        var susId = req.suscriber._id;
        var queryFind = {
            suscriptorId: susId
        };
        var info = await EmpresaModel.findOne(queryFind);

        if (info !== null) {
            const newRG = {
                new: true
            };
            var setUpate = {
                TipoPersona: params.TipoPersona,
                RasonSocial: params.RasonSocial,
                NombreComercial: params.NombreComercial,
                AvisoOperacion: params.AvisoOperacion,
                RUC: params.RUC,
                TipoEmpresa: params.TipoEmpresa
            }
            var _id = {
                _id: info._id
            };
            data = await EmpresaModel.findByIdAndUpdate(_id, setUpate, newRG);
            if (data !== null) {
                return res.status(200).json({
                    data,
                    code: 'API_E_200',
                    message: 'Registo de su empresa con éxito.'
                });
            }
        }

        enterprise.suscriptorId = susId;
        enterprise.TipoPersona = params.TipoPersona
        enterprise.RasonSocial = params.RasonSocial
        enterprise.NombreComercial = params.NombreComercial
        enterprise.AvisoOperacion = params.AvisoOperacion
        enterprise.RUC = params.RUC
        enterprise.TipoEmpresa = params.TipoEmpresa
        data = await enterprise.save();

        if (data == null) {
            return res.status(200).json({
                code: 'API_E_404',
                message: 'Error al registrar su empresa.'
            });
        }

        return res.status(200).json({
            data,
            code: 'API_E_200',
            message: 'Registo de su empresa con éxito.'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Error en createMyEnterprise',
            code: 'API_E_500'
        });
    }
}

async function updateMyEnterprise(req, res) {
    try {
        var params = req.body;
        var setCond = {
            _id: req.params._id
        };
        const newRG = {
            new: true
        };

        var setUpdate = {
            TipoPersona: params.TipoPersona,
            RasonSocial: params.RasonSocial,
            NombreComercial: params.NombreComercial,
            AvisoOperacion: params.AvisoOperacion,
            RUC: params.RUC,
            TipoEmpresa: params.TipoEmpresa,
            fecha_modificacion: await currentDate(),
        }

        var data = await EmpresaModel.findByIdAndUpdate(setCond, setUpdate, newRG);

        if (data !== null) {
            return res.status(200).json({
                data,
                code: 'API_E_200',
                message: 'Datos de su empresa han sido actualizados.'
            });
        }
        return res.status(200).json({
            code: 'API_E_404',
            message: 'Error al actualizar los datos de su empresa.'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Error en updateMyEnterprise',
            code: 'API_E_500'
        });
    }
}

async function viewMyEnterprise(req, res) {
    try {
        var susId = req.suscriber._id;
        var idSub = {
            suscriptorId: susId
        };
        var data = await EmpresaModel.findOne(idSub).exec();
        if (data !== null) {
            return res.status(200).json({
                data,
                code: 'API_E_200',
                message: 'Datos de su empresa.'
            });
        }
        return res.status(200).json({
            code: 'API_E_404',
            message: 'Error al mostrar los datos de su empresa.'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Error en viewMyEnterprise',
            code: 'API_E_500'
        });
    }
}

//queda en veremos.
async function listsMyEnterprise(req, res) {
    try {
        var susId = req.suscriber._id;
        var subIds = {
            suscriptorId: susId
        };
        var data = await EmpresaModel.find(subIds).exec();
        if (data !== null && data.length > 0) {
            return res.status(200).json({
                data,
                code: 'API_E_200',
                message: 'Listado de mis empresas.'
            });
        }
        return res.status(200).json({
            code: 'API_E_404',
            message: 'Error al mostrar los datos de sus empresas.'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Error en viewMyEnterprise',
            code: 'API_E_500'
        });
    }
}

var currentDate = async function () {
    var timeObject = new Date();
    timeObject.setHours(timeObject.getHours() - 5);
    return timeObject;
}

module.exports = {
    createMyEnterprise,
    updateMyEnterprise,
    viewMyEnterprise,
    listsMyEnterprise,

}