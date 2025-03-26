const express = require('express');
const router = express.Router();
const controller = require('../controllers/classLocationController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

router.post('/',verifyToken, checkRole(['admin']), controller.createLocation);
router.get('/', controller.getAllLocations);
router.get('/:id', controller.getLocationById);
router.put('/:id',verifyToken, checkRole(['admin']), controller.updateLocation);
router.delete('/:id',verifyToken, checkRole(['admin']), controller.deleteLocation);

module.exports = router;
