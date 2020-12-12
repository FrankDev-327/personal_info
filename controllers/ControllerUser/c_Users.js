'use strict';

const saltRounds = 10;
const bcrypt = require('bcryptjs-then');
const {UserModel} = require('../../models/index');

async function CreateUsers(req, res) {
    try {
        var params = req.body;
        var users = new UserModel();

        users.sexo = params.sexo;
        users.rubro = params.rubro;
        users.correo = params.correo;
        users.sector = params.sector;
        users.perfil = params.perfil;
        users.sobre_mi = params.sobre_mi;
        users.id_estado = params.id_estado;
        users.numero_contactar = params.numero_contactar;
        users.fecha_creacion = new Date().toISOString();
        users.ultima_conexion = new Date().toISOString();
        users.contrasena = await bcrypt.hash(params.contrasena, saltRounds);
        users.nombre = params.nombre
        users.apellido = params.apellido;

        var data = await users.save();

        if (data === null) {
            return res.status(200).json({code: 'API_U_403', message: 'No se pudo registrar el usuario'});
        }
        return res.status(200).json({data, code: 'API_U_200', message: 'Creación exitosa.'});

    } catch (error) {
        return res.status(200).json({error: error.message});
    }
}

async function UpdateUsers(req, res) {
    try {
        let idUser = {
            _id: req.params.id
        }
        var params = req.body;
        const newReg = {
            new: true
        };
        var info = await UserMethod.buildUpdateUsers(params);
        var info = {
            rubro: params.rubro,
            correo: params.correo,
            perfil: params.perfil,
            sobre_mi: params.sobre_mi,
            id_estado: params.id_estado,
            numero_contactar: params.numero_contactar,
            numero_contactar: params.numero_contactar,
            fecha_actualizacion: new Date().toISOString(),
            ultima_conexion: new Date().toISOString(),
            contrasena: await bcrypt.hash(params.contrasena, saltRounds),
            nombre: params.nombre,
            apellido: params.apellido
        }
        var data = await UserModel.findOneAndUpdate(idUser, info, newReg);

        if (data === null) {
            return res.status(200).json({code: 'API_U_403', message: 'Error al actualizar datos del usuario'});
        }
        return res.status(200).json({data, code: 'API_U_200', message: 'Datos actualizados.'});

    } catch (error) {
        return res.status(200).json({error: error.message});
    }
}

async function ViewUser(req, res) {
    try {
        let idUser = {
            _id: req.params.id
        }
        var data = await UserModel.find(idUser)

        if (data.length <= 0) {
            return res.status(200).json({code: 'API_U_402', message: 'No hay registro relacionado'});
        }
        return res.status(200).json({data, message: 'Información personal', code: 'API_U_200'});

    } catch (error) {
        return res.status(200).json({error: error.message});
    }
}

async function LoginUsers(req, res) {
    try {
        var params = req.body;
        var setQuery = {
            correo: params.correo
        }
        var data = await UserModel.findOne(setQuery);
        if (data === null) {
            return res.status(200).json({code: 'API_U_401', message: 'Correo no registrado'});
        }

        var comingPass = params.contrasena;
        var dbPass = data.contrasena;
        var checkPass = await bcrypt.compare(comingPass,  dbPass)
        if (! checkPass) {
            return res.status(200).json({code: 'API_U_401', message: 'Contraseña erronea. Intente nuevamente'});
        }

        return res.status(200).json({
            data, /*token: token,*/
            code: 'API_U_200',
            message: 'Inicio de sesión exitoso.'
        });

    } catch (error) {
        return res.status(200).json({code: 'API_U_402', error: error.message});
    }
}

async function uploadPerfil(req, res) {
    try {
        var filePre = req.files.imgPerfil;

        if (! filePre) {
            return res.status(200).json({code: 'API_U_403', message: 'Debe colocar una foto a subir.'});
        }

        let idUser = {
            _id: req.params.id
        };
        const newReg = {
            new: true
        }

        filePre = filePre.path.split('.')
        filePre = {
            perfil: filePre[0]
        }

        var data = await UserModel.findOneAndUpdate(idUser, filePre, newReg);

        if (data === null || data.length < 0) {
            return res.status(200).json({code: 'API_U_403', message: 'A ocurrido un error al subir su foto de perfil.'});
        }

        return res.status(200).json({data, code: 'API_U_200', message: 'A subido una foto de perfil.'});

    } catch (error) {
        return res.status(200).json({code: 'API_U_403', message: error.message});
    }
}

module.exports = {
    uploadPerfil,
    CreateUsers,
    UpdateUsers,
    LoginUsers,
    ViewUser
}
