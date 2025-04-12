const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/authMiddleware');
const academicYearController = require('../controllers/academicYearController');

// Krijo vitin akademik - admin only
router.post('/', verifyToken, checkRole(['admin']), academicYearController.createAcademicYear);

// Merr të gjithë vitet akademike
router.get('/', academicYearController.getAllAcademicYears);

// Merr një vit akademik me ID
router.get('/:id', academicYearController.getAcademicYearById);

// Përditëso vitin akademik - admin only
router.put('/:id', verifyToken, checkRole(['admin']), academicYearController.updateAcademicYear);

// Fshij vitin akademik - admin only
router.delete('/:id', verifyToken, checkRole(['admin']), academicYearController.deleteAcademicYear);

module.exports = router;
