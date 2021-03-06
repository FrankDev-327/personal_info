'use strict';

const AdminUserModel = require('../../models/m_AdminUser');

async function createNewAdmin(req, res) {
    try {
        var admin = new AdminUserModel(req.body);
        var info = await admin.save();
        if(info !== null) {
            return res.status(200).json({
                info,
                code:'API_AD_200',
                message:'Admin has been created!'
            });
        }
        return res.status(200).json({
            code:'API_AD_403',
            message:'Error to create new admin.'
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json(error)
    }
}

module.exports = {
    createNewAdmin,

}