const mongoose = require('mongoose');
const squareDetailsSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    cardId: {
        type: String,
        required: true
    },

    customerId:{
        type: String,
        required: true
    },

    auth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth'
    }

})

module.exports = mongoose.model('SquareDetails',squareDetailsSchema);