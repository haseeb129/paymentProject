const mongoose = require('mongoose');
const stripeDetailsSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    cardNumber: {
        type: Number,
        required: true
    },

    expMonth: {
        type: Number,
        required: true
    }, 

    expYear: {
        type: Number,
        required: true
    },

    cvc : {
        type : Number,
        required : true
    },

    auth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        unique: true
    }

})

module.exports = mongoose.model('StripeDetails',stripeDetailsSchema);