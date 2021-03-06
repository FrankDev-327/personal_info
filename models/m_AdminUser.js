'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminUserSchema = Schema({
    name: { type: String, trim: true },
    lastName: { type: String, trim: true },
    passowrd: { type: String, trim: true },
    email: { type: String, unique: true },
    dateCreated: { type: Date, default: new Date().toISOString() },
    roleType: { type: Schema.Types.Mixed }
 });

 const AdminUserModel = mongoose.model('Admins', AdminUserSchema);
 module.exports = AdminUserModel;