const express = require('express');
const router = express.Router();
const controller = require('../controllers/classLocationController');

router.post('/', controller.createLocation);
router.get('/', controller.getAllLocations);
router.get('/:id', controller.getLocationById);
router.put('/:id', controller.updateLocation);
router.delete('/:id', controller.deleteLocation);

module.exports = router;
