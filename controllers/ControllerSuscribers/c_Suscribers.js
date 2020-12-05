'use strict';

const saltRounds = 10;
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs-then');
const {SuscriberModel} = require('../../models/index');

async function generateHashPass(pass) {
    try {
        return bcrypt.hash(pass, saltRounds);
    } catch (error) {
        console.log(error);
    }
}

async function compareHash(susPass, infoPass) {
    try {
        return await bcrypt.compare(susPass, infoPass);
    } catch (error) {
        console.log(error);
    }
}

async function createSuscribers(req, res) {
    try {
        var params = req.body;
        var suscriber = new SuscriberModel();
        var pass = params.contrasena;
        suscriber.correo = params.correo;
        suscriber.nombre = params.nombre;
        suscriber.contrasena = await generateHashPass(pass);
        suscriber.apellido = params.apellido;

        var data = await suscriber.save();

        if (data === null) {
            return res.status(200).json({code: 'API_SU_403', message: 'Algo fallo al almacenar su informacion'});
        }
        return res.status(200).json({data, message: 'Registo hecho con éxito', code: 'API_SU_200'});

    } catch (error) {
        console.log(error)
        return res.status(200).json({code: 'API_SU_404', message: 'Este correo ya existe. Pruebe con otro.'});
    }
}

async function updateSuscribers(req, res) {
    try {
        var params = req.body;
        let idSuscriber = {
            _id: req.params.id
        };
        const newRecord = {
            new: true
        };
        let contentBody = {
            correo: params.correo,
            contrasena: params.contrasena,
            nombre: params.nombre,
            apellido: params.apellido
        }
        let data = await SuscriberModel.findOneAndUpdate(idSuscriber, contentBody, newRecord);

        if (data === null || data.length <= 0) {
            return res.status(200).json({code: 'API_SU_403', message: 'Error al actualizar sus datos. Intente nuevamente'});
        }

        return res.status(200).json({data, code: 'API_SU_200', message: 'Datos de Suscriptor actualizado con éxito.'});

    } catch (error) {
        return res.status(500).json({code: 'API_SU_403', error: error.message});
    }
}

async function loginSuscribers(req, res) {
    try {
        var params = req.body;
        var setQuery = {
            correo: {
                $in: [paramsSubs.correo]
            }
        }
        var data = await SuscriberModel.findOne(setQuery);

        if (data === null) {
            return res.status(200).json({code: 'API_U_403', message: 'Correo no registrado'});
        };

        var susPass = params.contrasena;
        var infoPass = data.contrasena
        var resultCompare = await compareHash(susPass, infoPass);

        if (! resultCompare) {
            return res.status(200).json({code: 'API_U_403', message: 'Contraseña incorrecta.'});
        }

        let token = encodeAplly.encodeMethod(data);
        return res.status(200).json({data, token: token, code: 'API_U_200', message: 'Acceso correcto'});

    } catch (error) {
        console.log(error)
        return res.status(500).json({code: 'API_U_403', error: error.message});
    }
}

async function uploadPerfil(req, res) {
    try {
        var filePre = req.files.imgPerfil;
        console.log(filePre)
        if (! filePre) {
            return res.status(200).json({code: 'API_SU_403', message: 'Debe colocar una imagen a subir.'});

        } else {

            let idSus = {
                _id: req.params.id
            };
            const newReg = {
                new: true
            }
            filePre = filePre.path.split('.');
            filePre = filePre[0].split('/');
            filePre = {
                foto_perfil: filePre[1]
            }

            var data = await SuscriberModel.findOneAndUpdate(idSus, filePre, newReg);

            if (data === null || data.length < 0) {
                return res.status(200).json({data, code: 'API_SU_403', message: 'A ocurrido un error al subir su foto de perfil.'});
            }

            return res.status(200).json({data, code: 'API_SU_200', message: 'A subido una foto de perfil.'});
        }

    } catch (error) {
        console.log(error);
        return res.status(200).json({code: 'API_SU_403', message: error.message});
    }
}

async function showProfileSus(req, res) {
    try {
        var imgSus = req.query.path;
        var pahtImg = '';
        pahtImg = __dirname + imgSus + '.jpg';

        fs.access(pahtImg, fs.constants.F_OK, (exists) => {
            if (exists) {
                // Debes cambiar el _PATH_ADSOLUTE_ por tu ruta en Window.
                // La carpeta donde se guarda es 'suscriber-img'.
                pahtImg = _PATH_ADSOLUTE_ + 'default-profile.jpg';
                return res.sendFile(path.resolve(pahtImg));
            }
            return res.sendFile(path.resolve(pahtImg));
        });

    } catch (error) {
        console.log(JSON.stringify(error));
        return res.status(200).json({code: 'API_SU_403', message: error.message});
    }
}

module.exports = {
    uploadPerfil,
    showProfileSus,
    loginSuscribers,
    updateSuscribers,
    createSuscribers
}
