const mongoose = require('mongoose');
const recurringPaymentSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    paymentId: {
        type: String,
        required: true
    },

    mode: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },
    type: {
        type: String, //"monthlyRecurring ||weeklyRecurring || OneTime"
        required: true
    },

    time: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        required: true
    },

    auth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
    },
    
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    },

})

module.exports = mongoose.model('RecurringPayment', recurringPaymentSchema);