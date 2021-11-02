const mongoose = require("mongoose");
const Payment = require("../models/payment");
const Admin = require("../models/admin");
const StripeDetails = require("../models/stripeDetails");
const SquareDetails = require("../models/squareDetails");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const SquareConnect = require("square-connect");
var defaultClient = SquareConnect.ApiClient.instance;
defaultClient.basePath = "https://connect.squareupsandbox.com";
var oauth2 = defaultClient.authentications["oauth2"];
oauth2.accessToken = process.env.SQUARE_SANDBOX_ACCESS_TOKEN;

module.exports.addStripeOneTime = async (req, res, next) => {
  const organization = req.params.organization;
  const fundType = req.params.fundType;
  const amount = req.body.amount;
  const description = req.body.description;
  const cardNumber = req.body.cardNumber;
  const expMonth = req.body.expMonth;
  const expYear = req.body.expYear;
  const cvc = req.body.cvc;

  var today = new Date();

  var hours = String(today.getHours());
  var minutes = String(today.getMinutes());
  var seconds = String(today.getSeconds());

  const time = hours + ":" + minutes + ":" + seconds;

  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  const date = mm + "/" + dd + "/" + yyyy;

  const token = await stripe.tokens.create({
    card: {
      number: cardNumber,
      exp_month: expMonth,
      exp_year: expYear,
      cvc: cvc,
    },
  });

  console.log("token");
  console.log(token);

  const charge = await stripe.charges.create({
    amount: amount * 100,
    currency: "usd",
    source: token.id,
    description: description,
  });
  console.log("charge");
  console.log(charge);
  console.log("charge.status");
  console.log(charge.status);

  if (charge.status == "succeeded") {
    console.log(charge.status);

    const payment = new Payment({
      _id: mongoose.Types.ObjectId(),
      mode: "stripe",
      paymentId: charge.id,
      date: date,
      time: time,
      description: description,
      amount: amount,
      status: charge.status,
      organization: organization,
      fundType: fundType,
      type: "OneTime",
    });

    payment
      .save()
      .then((paymentObj) => {
        res.status(201).json({
          message: "payment successful",
          paymentDetails: paymentObj,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  } else {
    return res.status(404).json({
      message: "payment failed",
    });
  }
};

module.exports.addSquareOneTime = async (req, res, next) => {
  const organization = req.params.organization;
  const fundType = req.params.fundType;
  const amount = req.body.amount * 100;
  const description = req.body.description;
  var squarePayment;
  const nonce = req.body.nonce;

  var apiInstance = new SquareConnect.PaymentsApi();

  await apiInstance
    .createPayment({
      source_id: nonce,
      idempotency_key: mongoose.Types.ObjectId().toString(),
      amount_money: { amount: amount, currency: "USD" },
    })
    .then(
      function (data) {
        console.log("API called successfully. Returned data: " + data);
        squarePayment = data.payment;
      },
      function (error) {
        console.error(error);
      }
    );

  if (
    squarePayment.status == "APPROVED" ||
    squarePayment.status == "COMPLETED"
  ) {
    console.log(squarePayment.status);
    var today = new Date();

    var hours = String(today.getHours());
    var minutes = String(today.getMinutes());
    var seconds = String(today.getSeconds());

    const time = hours + ":" + minutes + ":" + seconds;

    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    const date = mm + "/" + dd + "/" + yyyy;

    const payment = new Payment({
      _id: mongoose.Types.ObjectId(),
      mode: "square",
      fundType: fundType,
      type: "OneTime",
      paymentId: squarePayment.id,
      date: date,
      time: time,
      description: description,
      amount: amount,
      status: squarePayment.status,
      organization: organization,
    });

    payment
      .save()
      .then((paymentObj) => {
        res.status(201).json({
          message: "payment successful",
          paymentDetails: paymentObj,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  } else {
    return res.status(404).json({
      message: "payment failed",
    });
  }
};

module.exports.getByCustomer = (req, res, next) => {
  const id = req.params.id;
  Payment.find({ auth: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        count: result.length,
        details: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

module.exports.addUserPayment = async (req, res, next) => {
  const organization = req.params.id;
  const authId = req.body.authId;
  const payments = req.body.payments;
  var paymentmode;
  var paymentLoop = 0;

  var today = new Date();

  var hours = String(today.getHours());
  var minutes = String(today.getMinutes());
  var seconds = String(today.getSeconds());

  const time = hours + ":" + minutes + ":" + seconds;

  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  const date = mm + "/" + dd + "/" + yyyy;

  await Admin.find({ _id: organization })
    .sort({ _id: -1 })
    .limit(1)
    .exec()
    .then((admin) => {
      var adminObj = admin[0];
      paymentmode = adminObj.stripeEnabled;
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });

  if (paymentmode == true) {
    StripeDetails.findOne({ auth: authId })
      .exec()
      .then(async (stripeObj) => {
        console.log(stripeObj);

        payments.forEach(async (eachpayment) => {
          const token = await stripe.tokens.create({
            card: {
              number: stripeObj.cardNumber,
              exp_month: stripeObj.expMonth,
              exp_year: stripeObj.expYear,
              cvc: stripeObj.cvc,
            },
          });

          console.log("token");
          console.log(token);

          const charge = await stripe.charges.create({
            amount: eachpayment.amount * 100,
            currency: "usd",
            source: token.id,
            description: eachpayment.description,
          });
          console.log("charge");
          console.log(charge);
          console.log("charge.status");
          console.log(charge.status);

          console.log(charge.status);

          const payment = new Payment({
            _id: mongoose.Types.ObjectId(),
            mode: "stripe",
            fundType: eachpayment.fundType,
            type: eachpayment.type,
            paymentId: charge.id,
            date: date,
            time: time,
            description: eachpayment.description,
            amount: eachpayment.amount,
            status: charge.status,
            auth: authId,
            organization: organization,
          });

          await payment.save();

          if (paymentLoop == payments.length - 1) {
            res.status(201).json({
              message: "all payments are saved successfully",
            });
          }
          paymentLoop++;
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  } else {
    var squarePayment;
    SquareDetails.findOne({ auth: authId })
      .exec()
      .then(async (squareObj) => {
        console.log(squareObj);
        var apiInstance = new SquareConnect.PaymentsApi();

        payments.forEach(async (eachpayment) => {
          await apiInstance
            .createPayment({
              source_id: squareObj.cardId.toString(),
              idempotency_key: mongoose.Types.ObjectId().toString(),
              amount_money: {
                amount: eachpayment.amount * 100,
                currency: "USD",
              },
              customer_id: squareObj.customerId,
            })
            .then(
              function (data) {
                console.log("API called successfully. Returned data: " + data);
                squarePayment = data.payment;
              },
              function (error) {
                console.error(error);
              }
            );

          console.log(squarePayment.status);

          const payment = new Payment({
            _id: mongoose.Types.ObjectId(),
            mode: "square",
            fundType: eachpayment.fundType,
            type: eachpayment.type,
            paymentId: squarePayment.id,
            date: date,
            time: time,
            description: eachpayment.description,
            amount: eachpayment.amount,
            status: squarePayment.status,
            auth: authId,
            organization: organization,
          });

          await payment.save();
          if (paymentLoop == payments.length - 1) {
            res.status(201).json({
              message: "all payments are saved successfully",
            });
          }
          paymentLoop++;
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
};

module.exports.getByOrganization = async (req, res, next) => {
  const organization = req.params.id;
  Payment.find({ organization: organization })
    .exec()
    .then((payments) => {
      res.status(200).json({
        count: payments.length,
        payments: payments,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
