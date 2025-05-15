const express = require('express');
const { createSchedule, getSchedules,updateSchedule, deleteSchedule, getPublishedSchedules } = require('../controllers/uniScheduleController');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

router.post('/',verifyToken, checkRole(['admin']), createSchedule);
router.get('/', getSchedules);
router.get('/published',getPublishedSchedules);

router.patch('/:id', verifyToken, checkRole(['admin']), updateSchedule);
router.put('/:id',verifyToken, checkRole(['admin']), updateSchedule); 
router.delete('/:id',verifyToken, checkRole(['admin']), deleteSchedule); 

module.exports = router;
