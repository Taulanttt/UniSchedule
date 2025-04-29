const ListEmail = require('../models/ListEmail');


// Create a new email list
const createEmailList = async (req, res) => {
  const { name, emails } = req.body;

  if (!name || !emails || !Array.isArray(emails)) {
    return res.status(400).json({ error: "Name and emails array are required." });
  }

  try {
    const newList = await ListEmail.create({ name, emails });
    res.status(201).json(newList);
  } catch (error) {
    console.error("Create Email List Error:", error);
    res.status(500).json({ error: "Failed to create email list." });
  }
};

// Get all email lists
const getAllEmailLists = async (req, res) => {
  try {
    const lists = await ListEmail.findAll();
    res.status(200).json(lists);
  } catch (error) {
    console.error("Get Email Lists Error:", error);
    res.status(500).json({ error: "Failed to fetch email lists." });
  }
};

// Get a single email list by id
const getEmailListById = async (req, res) => {
  try {
    const list = await ListEmail.findByPk(req.params.id);
    if (!list) {
      return res.status(404).json({ error: "Email list not found." });
    }
    res.status(200).json(list);
  } catch (error) {
    console.error("Get Email List Error:", error);
    res.status(500).json({ error: "Failed to fetch email list." });
  }
};

// Update an email list
const updateEmailList = async (req, res) => {
  const { name, emails } = req.body;

  try {
    const list = await ListEmail.findByPk(req.params.id);
    if (!list) {
      return res.status(404).json({ error: "Email list not found." });
    }

    await list.update({ name, emails });
    res.status(200).json(list);
  } catch (error) {
    console.error("Update Email List Error:", error);
    res.status(500).json({ error: "Failed to update email list." });
  }
};

// Delete an email list
const deleteEmailList = async (req, res) => {
  try {
    const list = await ListEmail.findByPk(req.params.id);
    if (!list) {
      return res.status(404).json({ error: "Email list not found." });
    }

    await list.destroy();
    res.status(200).json({ message: "Email list deleted successfully." });
  } catch (error) {
    console.error("Delete Email List Error:", error);
    res.status(500).json({ error: "Failed to delete email list." });
  }
};

module.exports = {
  createEmailList,
  getAllEmailLists,
  getEmailListById,
  updateEmailList,
  deleteEmailList,
};
