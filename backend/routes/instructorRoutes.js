const express = require('express');
const {
  createInstructor,
  getInstructors,
  getInstructorById,
  updateInstructor,
  deleteInstructor
} = require('../controllers/instructorController');

const { verifyToken, checkRole } = require('../middleware/authMiddleware');

const router = express.Router();

// 🔒 Only admin can create, update, and delete instructors
router.post('/', verifyToken, checkRole(['admin']), createInstructor);
router.put('/:id', verifyToken, checkRole(['admin']), updateInstructor);
router.delete('/:id', verifyToken, checkRole(['admin']), deleteInstructor);

// 🔓 Public routes (Anyone can view instructors)
router.get('/', getInstructors);
router.get('/:id', getInstructorById);

module.exports = router;
