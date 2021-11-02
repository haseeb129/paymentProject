const mongoose = require('mongoose');
const Auth = require('../models/auth');
const Role = require('../models/roles');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Admin = require('../models/admin');


module.exports.signupWithEmail = (req, res, next) => {
    const email = req.body.email;
    const pass = req.body.pass;
    const roleId = req.body.roleId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const adminId = req.body.adminId;
    var isAdmin;
    var isSuperAdmin;
    var hashP;
    Auth.find({ email: email })
        .exec()
        .then(
            async function (result) {
                if (result.length > 0) {
                    console.log("already");
                    return res.status(500).json({
                        message: "email already registered"
                    })
                }
                else {
                    await bcrypt.hash(pass, saltRounds, function (err, hash) {
                        if (err) {
                            console.log(err)
                            return res.status(500).json({
                                error: err
                            })
                        }
                        else {
                            hashP = hash
                            console.log(hashP);
                            const auth = new Auth({
                                _id: mongoose.Types.ObjectId(),
                                email: email,
                                password: hashP,
                                roleId: roleId,
                                firstName: firstName,
                                lastName: lastName,
                                adminId: adminId
                            });
                            console.log(auth);
                            auth.save()
                                .then(async result => {
                                    const id = result._id
                                    const email = result.email
                                    const password = result.password
                                    const roleId = result.roleId
                                    const firstName = result.firstName
                                    const lastName = result.lastName

                                    const role = await Role.findOne({ _id: result.roleId });
                                    if (role.name == "admin") {
                                        isAdmin = true;
                                    }
                                    if (role.name == "superAdmin") {
                                        isSuperAdmin = true;
                                    }
                                    else {
                                        isAdmin = false;
                                        isSuperAdmin = false
                                    }

                                    const admin = await Auth.findOne({ _id: adminId });
                                    const route = admin.route;


                                    const token = await jwt.sign({ id, email, password, roleId, firstName, lastName, isAdmin, isSuperAdmin, route }, process.env.JWT_SESSION_KEY, { expiresIn: '60d' });
                                    res.status(201).json({
                                        message: "sign up successful",
                                        token: token
                                    })
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        error: err
                                    })
                                })
                        }
                    });
                }
            }
        ).catch(err => {
            res.status(500).json({
                error: err
            })
        })
}


module.exports.getAll = (req, res, next) => {
    Auth.find()
        .select('_id email password roleId recurringPaymnets firstName lastName')
        .populate({ path: 'roleId' })
        .exec()
        .then(result => {
            res.status(200).json({
                count: result.length,
                users: result
            })

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

module.exports.delete = (req, res, next) => {
    const id = req.params.id;
    Auth.remove({ _id: id })
        .exec()
        .then(result => {
            if (result.deletedCount > 0) {
                res.status(200).json({
                    message: "admin deleted successfully"

                })
            }
            else {
                res.status(404).json({
                    message: "no admin found"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

module.exports.loginWithEmail = (req, res, next) => {
    const email = req.body.email;
    const pass = req.body.pass;
    console.log(pass);
    Auth.findOne({ email: email })
        .then(async result => {
            if (result) {
                // console.log(result);
                await bcrypt.compare(pass, result.password, async function (err, newResult) {
                    if (err) {
                        return res.status(501).json({
                            error: err
                        })
                    }
                    else {
                        const id = result._id
                        const email = result.email
                        const password = result.password
                        const roleId = result.roleId
                        const firstName = result.firstName
                        const lastName = result.lastName
                        const adminId = result.adminId;

                        // console.log(newResult);
                        if (newResult) {
                            const role = await Role.findOne({ _id: result.roleId });
                            if (role.name == "admin") {
                                isAdmin = true;
                                isSuperAdmin = false;
                              


                                const token = jwt.sign({ id, email, password, roleId, firstName, lastName, isAdmin, isSuperAdmin }, process.env.JWT_SESSION_KEY, { expiresIn: '60d' });

                                // console.log(role);
                                return res.status(201).json({
                                    token: token,
                                    user: {
                                        id: result._id,
                                        email: result.email,
                                        roleId: result.roleId,
                                        role: role.name,
                                        isAdmin: isAdmin
                                    }
                                })
                            }
                            if (role.name == "superAdmin") {
                                isSuperAdmin = true;
                                isAdmin = false;

                                const token = jwt.sign({ id, email, password, roleId, firstName, lastName, isAdmin, isSuperAdmin }, process.env.JWT_SESSION_KEY, { expiresIn: '60d' });

                                // console.log(role);
                                return res.status(201).json({
                                    token: token,
                                    user: {
                                        id: result._id,
                                        email: result.email,
                                        roleId: result.roleId,
                                        role: role.name,
                                        isAdmin: isAdmin
                                    }
                                })
                            }
                            else {
                                isAdmin = false;
                                isSuperAdmin = false;


                                const admin = await Auth.findOne({ _id: adminId });
                                console.log(admin)
                                console.log(admin.route);

                                const route = admin.route;
                                console.log(route);


                                const token = jwt.sign({ id, email, password, roleId, firstName, lastName, isAdmin, isSuperAdmin, route }, process.env.JWT_SESSION_KEY, { expiresIn: '60d' });

                                // console.log(role);
                                return res.status(201).json({
                                    token: token,
                                    user: {
                                        id: result._id,
                                        email: result.email,
                                        roleId: result.roleId,
                                        role: role.name,
                                        isAdmin: isAdmin
                                    }
                                })
                            }
                        }
                        else {
                            return res.status(500).json({
                                message: "invalid Password"
                            })

                        }
                    }
                })

            }


            else {
                return res.status(500).json({
                    message: "invalid email"
                })
            }
        })
        .catch(err => {
            res.status(502).json({
                error: err
            })
        })

}


module.exports.getAllCustomers = async (req, res, next) => {

    var roleId;
    await Role.findOne({ name: "customer" })
        .exec()
        .then(role => {
            roleId = role._id;
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

    await Auth.find({ roleId: roleId })
        .select('_id email password roleId recurringPaymnets firstName lastName')
        // .populate({ path: 'roleId' })
        .exec()
        .then(result => {
            res.status(200).json({
                count: result.length,
                users: result
            })

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

}


module.exports.updatePassword = (req, res, next) => {
    const id = req.params.id;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    var hashP;
    Auth.findById(id)
        .exec()
        .then(async auth => {
            await bcrypt.compare(oldPassword, auth.password, async (err, result) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                }
                else {
                    if (result) {
                        await bcrypt.hash(newPassword, saltRounds, function (err, hash) {
                            if (err) {
                                res.status(500).json({
                                    error: err
                                })
                            }
                            else {
                                hashP = hash;
                                auth.password = hashP;
                                auth.save()
                                    .then(authObj => {
                                        res.status(201).json({
                                            message: "password updated successfully",
                                            user: authObj
                                        })
                                    })
                                    .catch(err => {
                                        res.status(500).json({
                                            error: err
                                        })
                                    })
                            }
                        })
                    }
                    else {
                        return res.status(401).json({
                            error: "invalid current passsword"
                        })
                    }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })



}


module.exports.addAdmin = async (req, res, next) => {
    const email = req.body.email;
    const pass = req.body.pass;
    const route = req.body.route;
    var roleId;

    await Role.findOne({ name: "admin" })
        .exec()
        .then(role => {
            roleId = role._id;
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    var hashP;
    Auth.find({ email: email })
        .exec()
        .then(
            async function (result) {
                if (result.length > 0) {
                    console.log("already");
                    return res.status(500).json({
                        message: "email already registered"
                    })
                }
                else {
                    await bcrypt.hash(pass, saltRounds, function (err, hash) {
                        if (err) {
                            console.log(err)
                            return res.status(500).json({
                                error: err
                            })
                        }
                        else {
                            hashP = hash
                            console.log(hashP);
                            const auth = new Auth({
                                _id: mongoose.Types.ObjectId(),
                                email: email,
                                password: hashP,
                                roleId: roleId,
                                route: route,
                            });
                            console.log(auth);
                            auth.save()
                                .then(async result => {
                                    const id = result._id
                                    const email = result.email
                                    const password = result.password
                                    const roleId = result.roleId


                                    const role = await Role.findOne({ _id: result.roleId });
                                    if (role.name == "admin") {
                                        isAdmin = true;
                                    }
                                    else {
                                        isAdmin = false;
                                    }


                                    const token = await jwt.sign({ id, email, password, roleId, isAdmin }, process.env.JWT_SESSION_KEY, { expiresIn: '60d' });
                                    res.status(201).json({
                                        message: "admin added successfully",
                                    })
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        error: err
                                    })
                                })
                        }
                    });
                }
            }
        ).catch(err => {
            res.status(500).json({
                error: err
            })
        })

}


module.exports.getAllAdmins = async (req, res, next) => {
    var roleId;
    await Role.findOne({ name: "admin" })
        .exec()
        .then(role => {
            roleId = role._id;
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

    await Auth.find({ roleId: roleId })
        .select('_id email password roleId recurringPaymnets firstName lastName route')
        // .populate({ path: 'roleId' })
        .exec()
        .then(result => {
            res.status(200).json({
                count: result.length,
                users: result
            })

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

}


module.exports.saveRoute = (req, res, next) => {
    const auth = req.body.authId;
    const admin = req.body.adminId;
}