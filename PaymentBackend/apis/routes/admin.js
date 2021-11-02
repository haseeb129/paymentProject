const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const mongoose = require('mongoose');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/')
    },
    filename: function (req, file, cb) {
        // cb(null, new Date().toISOString()+file.originalname)
        cb(null, new mongoose.Types.ObjectId() + file.originalname)

    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        console.log('if')
        cb(null, true);
    }
    else {
        console.log('else')
        cb(null, false);
    }
}

const upload = multer({
    storage: storage
    , limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter
});


router.post('/add', upload.single('image'), adminController.insert);
router.get('/getAll', adminController.getAll);
router.get('/get/:id', adminController.get);
module.exports = router;
