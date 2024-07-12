// routes/messages.js
const express = require('express');
const router = express.Router();
const Message = require('../model/messages');

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post a new message
router.post('/', async (req, res) => {

  const message = new Message({
    name: req.body.name,
    message: req.body.message
  });
  console.log("herrr"+message)

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;