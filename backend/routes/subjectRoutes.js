const express = require('express');
const {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject
} = require('../controllers/subjectController');

const { verifyToken, checkRole } = require('../middleware/authMiddleware');

const router = express.Router();

// 🔒 Only admin can create, update, and delete subjects
router.post('/', verifyToken, checkRole(['admin']), createSubject);
router.put('/:id', verifyToken, checkRole(['admin']), updateSubject);
router.delete('/:id', verifyToken, checkRole(['admin']), deleteSubject);

// 🔓 Public routes (Anyone can view subjects)
router.get('/', getSubjects);
router.get('/:id', getSubjectById);

module.exports = router;
