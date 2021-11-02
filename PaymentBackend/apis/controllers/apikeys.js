const mongoose = require('mongoose');
const ApiKey = require('../models/apikeys');

module.exports.add = (req, res, next) => {
    const {
        stripePrivateKey,
        stripePublicKey,
        squareSandBoxKey,
        squareProductionKey
    } = req.body;
    const apikey = new ApiKey({
        _id: mongoose.Types.ObjectId(),
        stripePrivateKey: stripePrivateKey,
        stripePublicKey: stripePublicKey,
        squareSandBoxKey: squareSandBoxKey,
        squareProductionKey: squareProductionKey
    })
    apikey.save().then(result => {
        res.status(201).json({
            message: "api keys added successfully",
            apikeys: result
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
}


module.exports.get = (req, res, next) => {
    var apikey = {};
    ApiKey.find()
        // .select('_id  stripePrivateKey, stripePublicKey, squareSandBoxKey, squareProductionKey')
        .sort({ _id: -1 })
        .limit(1)
        .exec()
        .then(result => {

            apikey = result[0];

            res.status(200).json({
                apikey: apikey
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

