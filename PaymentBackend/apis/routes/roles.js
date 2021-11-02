const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/roles');
const middleWareAuth = require('../middleware/auth')

router.get('/', rolesController.getAll);
router.post('/',  rolesController.insert);
router.delete('/:id', rolesController.delete);
module.exports = router;