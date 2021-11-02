const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Payment = require('./apis/models/payment');
const RecurringPayment = require('./apis/models/recurring_payments');

const cors = require('cors');
var schedule = require('node-schedule');
mongoose.connect('mongodb://localhost:27017/paymentAppDB', { useNewUrlParser: true });
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const route1 = "/myapp/api"
// app.use('/images',express.static('images'));
const authRoute = require('./apis/routes/auth');
app.use(`${route1}/auth`, authRoute);

const rolesRoute = require('./apis/routes/roles');
app.use(`${route1}/roles`, rolesRoute);

const adminRoute = require('./apis/routes/admin');
app.use(`${route1}/admin`, adminRoute);

const organizationRoute = require('./apis/routes/organizations');
app.use(`${route1}/organization`, organizationRoute);

const stripeRoute = require('./apis/routes/stripeDetails');
app.use(`${route1}/stripeDetails`, stripeRoute);

const sqaureRoute = require('./apis/routes/squareDetails');
app.use(`${route1}/squareDetails`, sqaureRoute);

const paymentRoute = require('./apis/routes/payment');
app.use(`${route1}/payment`, paymentRoute);

const apiKeyRoute = require('./apis/routes/apikeys');
app.use(`${route1}/apikeys`, apiKeyRoute);

app.use("/hello", async (req, res, next) => {
    var monthlyPayments = [];
    var j = schedule.scheduleJob('00 00 10 * * *', async function () {
        await console.log('The answer to life, the universe, and everything!');
    });
    res.status(200).json({
        message: "hello world"
    })


    await Payment.find({ type: "monthlyRecurring" })
        .populate('organization')
        .exec()
        .then(async payments => {
            // console.log(payments)
            for (const payment of payments) {
                await monthlyPayments.push(payment);
            }

            console.log(monthlyPayments)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

    //find monthly recurring
    //find weekly recurring
    // check month happended or not
    //check week happened or not
    // if done payment 



})

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);

});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;