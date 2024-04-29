const Task = require('../models/task');

const index = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const store = async (req, res) => {
  try {
    const { title, status } = req.body;
    const userId = req.user._id;
    const task = new Task({
      userId,
      title,
      status
    });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { title, status } = req.body;
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, { title, status }, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  index,
  store,
  update,
  destroy
};
