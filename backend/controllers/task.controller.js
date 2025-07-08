import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find().populate("assignedTo", "username role");
  res.json(tasks);
};

export const getMyTasks = async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.userId });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title, assignedTo } = req.body;
  const task = new Task({ title, assignedTo });
  await task.save();
  res.status(201).json({ message: "Task created" });
};

export const updateTask = async (req, res) => {
  const { status } = req.body;
  await Task.findByIdAndUpdate(req.params.id, { status });
  res.json({ message: "Task updated" });
};
