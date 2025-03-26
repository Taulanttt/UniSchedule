const express = require('express');
const {
  createSemester,
  getSemesters,
  getSemesterById,
  updateSemester,
  deleteSemester
} = require('../controllers/semesterController'); // Ensure this path is correct
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

const router = express.Router();

// 🔒 Only admin can create, update, and delete semesters
router.post('/', verifyToken, checkRole(['admin']), createSemester);
router.put('/:id', verifyToken, checkRole(['admin']), updateSemester);
router.delete('/:id', verifyToken, checkRole(['admin']), deleteSemester);

// 🔓 Public routes (Anyone can view semesters)
router.get('/', getSemesters);
router.get('/:id', getSemesterById);

module.exports = router;
