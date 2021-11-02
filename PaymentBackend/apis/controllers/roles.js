const mongoose = require('mongoose');
const Role = require('../models/roles');

module.exports.insert = (req,res,next)=>{
    const name = req.body.name;
    const role = new Role({
        _id : mongoose.Types.ObjectId(),
        name : name
    })
    role.save().then(result => {
        res.status(201).json({
            message : "new role added successfully",
            role: {
                _id : result._id,
                name: result.name
            }
        })
    }).catch(err=>{
        res.status(500).json({
            error : err
        })
    })
}


module.exports.getAll = (req,res,next)=>{
    Role.find()
    .select('_id name')
    .exec()
    .then(result=>{
        res.status(200).json({
            count: result.length,
            roles : result
        })
    }).catch(err=>{
        res.status(500).json({
            error : err
        })
    })
}

module.exports.delete = (req,res,next)=>{
    const id = req.params.id;
    Role.remove({_id:id}).exec()
    .then(result => {

        if(result.deletedCount>0){
        res.status(200).json({
            message : "role deleted successfully"
        })
    }
    else{
        res.status(404).json({
            error : "no role found"
        })
    }
    })
    .catch(err=>{
        res.status(500).json({
            error : err
        })
    })
}
