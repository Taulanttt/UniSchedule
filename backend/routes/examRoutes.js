// routes/examRoutes.js
const express = require('express');
const router = express.Router();
const examController = require('../controllers/examScheduleController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

// POST: Create a new exam schedule
router.post('/',verifyToken, checkRole(['admin']), examController.createExamSchedule);

// GET: Get all exam schedules
router.get('/', examController.getAllExamSchedules);

// GET: Get a single exam schedule by ID
router.get('/:id', examController.getExamScheduleById);

router.put('/:id', verifyToken, checkRole(['admin']), examController.updateExamSchedule);

// DELETE: Delete an exam schedule by ID
router.delete('/:id',verifyToken, checkRole(['admin']), examController.deleteExamSchedule);

module.exports = router;
