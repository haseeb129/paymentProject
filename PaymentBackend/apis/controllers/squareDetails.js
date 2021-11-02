const mongoose = require('mongoose');
const SquareDetail = require('../models/squareDetails');
const unirest = require('unirest');
const access_token_sandbox = process.env.SQUARE_SANDBOX_ACCESS_TOKEN;
const access_token = process.env.SQUARE_PRODUCTION_ACCESS_TOKEN;
const SquareConnect = require('square-connect');


module.exports.add = async (req, res, next) => {
    const auth = req.body.authId;
    const nonce = req.body.nonce;
    const email = req.body.email;
    var customerId;
    var cardId;

    var defaultClient = SquareConnect.ApiClient.instance;
    defaultClient.basePath = 'https://connect.squareupsandbox.com';


    var oauth2 = defaultClient.authentications['oauth2'];
    oauth2.accessToken = access_token_sandbox;

    var apiInstance = new SquareConnect.CustomersApi();


    await apiInstance.createCustomer({ email_address: email }).then(function (data) {
        console.log('API called successfully. Returned data: ' + data.customer.id);
        customerId = data.customer.id;
    }, function (error) {
        console.error(error);
    });

    console.log(1);
    var body2 = new SquareConnect.CreateCustomerCardRequest(nonce);
    await apiInstance.createCustomerCard(customerId, body2).then(function (data) {
        console.log('API called successfully. Returned data: ' + data.card.id);
        cardId = data.card.id;
    }, function (error) {
        console.error(error);
    });


    console.log(2)
    const squareDetail = new SquareDetail({
        _id: mongoose.Types.ObjectId(),
        cardId: cardId,
        customerId : customerId,
        auth: auth
    })

    console.log(3);
    await squareDetail.save()
        .then(result => {
            res.status(201).json({
                message: "square details saved successfully",
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
    SquareDetail.findOne({ auth: id })
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
