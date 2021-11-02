const Admin = require('../models/admin')
const mongoose = require('mongoose');
const Auth = require('../models/auth');
const Role = require('../models/roles');

module.exports.insert = (req, res, next) => {
    var image;
    const auth = req.body.authId;
    const email = req.body.email;
    const stripeEnabled = req.body.stripeEnabled;
    const businessName = req.body.businessName;
    const businessNumber = req.body.businessNumber;
    const addressVerification = req.body.addressVerification;
    const activeOrganizationType = req.body.activeOrganizationType;
    const stripePrivateKey = req.body.stripePrivateKey;
    const stripePublishableKey = req.body.stripePublishableKey;
    const squareProductionKey = req.body.squareProductionKey;
    const squareSandBoxKey = req.body.squareSandBoxKey;
    const displayName = req.body.displayName;
    const primaryName = req.body.primaryName;
    const primaryPhoneNumber = req.body.primaryPhoneNumber;
    const primaryAddress = req.body.primaryAddress;
    const primaryEmail = req.body.primaryEmail;
    const secondaryName = req.body.secondaryName;
    const secondaryPhoneNumber = req.body.secondaryPhoneNumber;
    const secondaryAddress = req.body.secondaryAddress;
    const secondaryEmail = req.body.secondaryEmail;
    const businessEmail = req.body.businessEmail;
    const notificationEmail = req.body.notificationEmail;
    req.file != null ? image = req.file.path : null;


    const admin = new Admin({
        _id: mongoose.Types.ObjectId(),
        auth: auth,
        email: email,
        stripeEnabled: stripeEnabled,
        businessName: businessName,
        businessNumber: businessNumber,
        addressVerification: addressVerification == "true" ? true : false,
        activeOrganizationType: activeOrganizationType,
        stripePrivateKey: stripePrivateKey,
        stripePublishableKey: stripePublishableKey,
        squareProductionKey: squareProductionKey,
        squareSandBoxKey: squareSandBoxKey,
        displayName: displayName,
        primaryName: primaryName,
        primaryPhoneNumber: primaryPhoneNumber,
        primaryAddress: primaryAddress,
        primaryEmail: primaryEmail,
        secondaryName: secondaryName,
        secondaryPhoneNumber: secondaryPhoneNumber,
        secondaryAddress: secondaryAddress,
        secondaryEmail: secondaryEmail,
        businessEmail: businessEmail,
        notificationEmail: notificationEmail,
        image: image
    });

    console.log(req.body);
    console.log(admin);
    admin.save()
        .then(adminObj => {
            res.status(201).json({
                message: "details added successfully",
                details: adminObj
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}



module.exports.get = (req, res, next) => {
    const id = req.params.id;
    Admin.find({ auth: id })
        .sort({ _id: -1 })
        .limit(1)
        .exec()
        .then(admin => {
            if (admin.length > 0) {
                res.status(200).json({
                    details: admin[0]
                })
            }
            else {
                res.status(404).json({
                    message: "not found"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}




module.exports.getAll = async (req, res, next) => {
    var roleId;
    var authArray = [];
    var organizationsArray = [];
    var a = 0;
    var nullAdmin = [{
        _id: null,
        auth: { _id: '', email: '', password: '', roleId: '' },
        email: '',
        stripeEnabled: false,
        businessName: '',
        businessNumber: 123,
        addressVerification: false,
        activeOrganizationType: '',
        stripePrivateKey: '',
        stripePublishableKey: '',
        squareProductionKey: '',
        squareSandBoxKey: '',
        displayName: '',
        primaryName: '',
        primaryPhoneNumber: '',
        primaryAddress: '',
        primaryEmail: '',
        secondaryName: '',
        secondaryPhoneNumber: 51,
        secondaryAddress: '',
        secondaryEmail: '',
        businessEmail: '',
        notificationEmail: '',

    }];

    await Role.findOne({ name: "admin" })
        .exec()
        .then(role => {
            roleId = role._id
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    await Auth.find({ roleId: roleId })
        .exec()
        .then(async auth => {
            await auth.forEach(authObj => {
                authArray.push(authObj);
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    console.log(authArray);

    await authArray.forEach(async authObj => {
        await Admin.find({ auth: authObj._id })
            .sort({ _id: -1 })
            .populate('auth')
            .limit(1)
            .exec()
            .then(async admins => {

                if (admins.length == 0) {
                    var nullAdmin2 = {
                        _id: null,
                        auth: { _id: authObj._id, email: authObj.email, password: authObj.password, roleId: authObj.roleId, route: authObj.route },
                        email: null,
                        stripeEnabled: null,
                        businessName: null,
                        businessNumber: null,
                        addressVerification: null,
                        activeOrganizationType: null,
                        stripePrivateKey: null,
                        stripePublishableKey: null,
                        squareProductionKey: null,
                        squareSandBoxKey: null,
                        displayName: null,
                        primaryName: null,
                        primaryPhoneNumber: null,
                        primaryAddress: null,
                        primaryEmail: null,
                        secondaryName: null,
                        secondaryPhoneNumber: null,
                        secondaryAddress: null,
                        secondaryEmail: null,
                        businessEmail: null,
                        notificationEmail: null,

                    };
                    organizationsArray.push(nullAdmin2);
                    a++;
                }
                else {
                    organizationsArray.push(admins[0]);
                }
                if (organizationsArray.length == authArray.length) {
                    res.status(201).json({
                        count: organizationsArray.length,
                        organizations: organizationsArray
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    })
}


// delete all admin records