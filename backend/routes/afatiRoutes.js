const express = require('express');
const router = express.Router();
const afatiController = require('../controllers/afatiController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

router.get('/', afatiController.getAllAfati);
router.get('/:id', afatiController.getAfatiById);
router.post('/', verifyToken, checkRole(['admin']), afatiController.createAfati);
router.put('/:id', verifyToken, checkRole(['admin']), afatiController.updateAfati);
router.delete('/:id',verifyToken, checkRole(['admin']), afatiController.deleteAfati);

module.exports = router;
