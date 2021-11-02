const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required : true
    },
    email: {
        type: String,
        required: true
    },
    stripeEnabled: {
        type: Boolean,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    businessNumber: {
        type: String,
        required: true
    },
    addressVerification: {
        type: Boolean,
        required: true
    },
    activeOrganizationType: {
        type: String,
        required: true
    },

    stripePrivateKey: {
        type: String,
        required: true
    },

    stripePublishableKey: {
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
    },

    displayName: {
        type: String,
        required: true
    },
    image : {
        type : String,
    },

    primaryName : {
        type: String,
        required : true
    },

    primaryPhoneNumber : {
        type: String,
        required : true
    },

    primaryAddress : {
        type: String,
        required : true
    },


    primaryEmail : {
        type: String,
        required : true
    },


    secondaryName : {
        type: String,
        required : true
    },

    secondaryPhoneNumber : {
        type: String,
        required : true
    },

    secondaryAddress : {
        type: String,
        required : true
    },


    secondaryEmail : {
        type: String,
        required : true
    },

    businessEmail:{
        type : String,
        required : true
    },

    notificationEmail:{
        type : String,
        required : true
    },

    // smtpIn
    
    auth:{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "Auth"
    }
    

});

module.exports = mongoose.model('Admin', adminSchema);