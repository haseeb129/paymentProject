const mongoose = require('mongoose');
const apikeySchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    stripePrivateKey: {
        type: String,
        required: true
    },
    stripePublicKey: {
        type: String,
        required: true
    },
    squareSandBoxKey: {
        type: String,
        required: true
    },
    squareProductionKey: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ApiKey', apikeySchema);