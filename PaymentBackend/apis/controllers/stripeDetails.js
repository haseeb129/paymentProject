const mongoose = require('mongoose');
const StripeDetail = require('../models/stripeDetails');


module.exports.add = async (req, res, next) => {
    const cardNumber = req.body.cardNumber;
    const expMonth = req.body.expMonth;
    const expYear = req.body.expYear;
    const cvc = req.body.cvc;
    const auth = req.body.authId;

    const stripeDetail = new StripeDetail({
        _id: mongoose.Types.ObjectId(),
        cardNumber: cardNumber,
        expMonth: expMonth,
        expYear: expYear,
        cvc: cvc,
        auth: auth
    })

    stripeDetail.save()
        .then(result => {
            res.status(201).json({
                message: "stripe details saved successfully",
                details: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}






module.exports.getByCustomer = (req, res, next) => {

    const id = req.params.id;
    StripeDetail.findOne({ auth: id })
        .exec()
        .then(result => {
            res.status(200).json({
                details: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}