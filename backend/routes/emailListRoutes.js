const express = require('express');
const router = express.Router();
const {
  createEmailList,
  getAllEmailLists,
  getEmailListById,
  updateEmailList,
  deleteEmailList,
} = require('../controllers/emailListController');

// Create a new email list
router.post('/', createEmailList);

// Get all email lists
router.get('/', getAllEmailLists);

// Get a single email list by ID
router.get('/:id', getEmailListById);

// Update an email list by ID
router.put('/:id', updateEmailList);

// Delete an email list by ID
router.delete('/:id', deleteEmailList);

module.exports = router;
