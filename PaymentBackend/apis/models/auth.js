const mongoose = require('mongoose');
const authSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    firstName: {
        type: String,
    },

    lastName: {
        type: String,
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    route: {
        type: String,
        unique : true
    },

    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },

    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Role'
    }

});

module.exports = mongoose.model('Auth', authSchema);