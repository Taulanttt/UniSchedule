const express = require('express');
const { createSchedule, getSchedules } = require('../controllers/uniScheduleController');
const router = express.Router();

router.post('/', createSchedule);
router.get('/', getSchedules);

module.exports = router;
