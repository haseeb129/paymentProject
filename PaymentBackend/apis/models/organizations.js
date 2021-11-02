const mongoose = require('mongoose');
const organizationSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
 
    },
    name : {
        type : String,
        required : true,
        unique : true
    }

});

module.exports = mongoose.model('Organization', organizationSchema);