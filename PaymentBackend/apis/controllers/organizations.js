const Organziation = require('../models/organizations');
const mongoose = require('mongoose');

module.exports.insert = (req, res, next) => {

    const name = req.body.name;
    const organziation = new Organziation({
        _id: mongoose.Types.ObjectId(),
        name: name
    });


    organziation.save()
        .then(organziationObj => {
            res.status(201).json({
                message: "organization added successfully",
                organziation: organziationObj
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

}


module.exports.get = (req, res, next) => {

    Organziation.find()
        .exec()
        .then(organizations => {
            if (organizations.length > 0) {
                res.status(200).json({
                    count: organizations.length,
                    organizations: organizations
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


module.exports.update = (req, res, next) => {
    const id = req.params.id;
    const name = req.body.name;

    console.log(req.body);

    Organziation.findById(id)
        .exec()
        .then(organization => {
            console.log(organization)
            organization.name = name;

            organization.save()
                .then(organziationObj => {
                    console.log(organziationObj)
                    res.status(201).json({
                        message: "organization updated successfully",
                        organization: organziationObj
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
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
    Organziation.remove({ _id: id })
        .exec()
        .then(result => {
            if (result.deletedCount > 0) {
                res.status(201).json({
                    message: "organization deleted sucessfully"
                })
            }
            else {
                res.status(404).json({
                    message: "no organization found"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

