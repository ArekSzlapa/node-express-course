const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError("Not found", 404));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const { body } = req;
  const taskToUpdate = await Task.findOneAndUpdate({ _id: taskID }, body, {
    new: true,
    runValidators: true,
  });
  if (!taskToUpdate) {
    return next(createCustomError("Not found", 404));
  }
  res.status(200).json({ taskToUpdate });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const taskToDelete = await Task.findOneAndDelete({ _id: taskID });
  if (!taskToDelete) {
    return next(createCustomError("Not found", 404));
  }
  res.status(200).json({ taskToDelete });
});

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
};
