const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const Todo = require("../models/todoModel");

/**
 * @desc For crate task
 * @route /api/task
 * @access Public
 */
exports.createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const todo = await Todo.create({ title, description });
  res.status(201).json({
    success: true,
    data: todo,
    message: "Task created successfully",
  });
});

/**
 * @desc For Update Task
 * @route /api/task/:id
 * @access Public
 */
exports.updateTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const existTask = await Todo.findOne({ _id: req.params.id });
  if (existTask) {
    existTask.title = title;
    existTask.description = description;
    const updatedTask = await existTask.save();
    res.status(200).json({
      success: true,
      data: updatedTask,
      message: "Task updated successfully",
    });
  } else {
    res.status(401).json({
      success: false,
      data: null,
      message: "Task is Not Found",
    });
  }
});

/**
 * @desc For Delete Task
 * @route /api/task/:id
 * @access Public
 */
exports.deleteTask = asyncHandler(async (req, res) => {
  const existTask = await Todo.findOne({ _id: req.params.id });
  if (existTask) {
    await existTask.remove();
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } else {
    res.status(401).json({
      success: false,
      data: null,
      message: "Task is Not Found",
    });
  }
});

/**
 * @desc For Get Single Task
 * @route /api/task/:id
 * @access Public
 */
exports.getSingleTask = asyncHandler(async (req, res) => {
  const existTask = await Todo.findOne({ _id: req.params.id });
  if (existTask) {
    res.status(200).json({
      success: true,
      data: existTask,
      message: "Task fetched successfully",
    });
  } else {
    res.status(401).json({
      success: false,
      data: null,
      message: "Task is Not Found",
    });
  }
});

/**
 * @desc For Get all Tasks
 * @route /api/task
 * @access Public
 */
exports.getAllTasks = asyncHandler(async (req, res) => {
  const allTasks = await Todo.find({});
  if (allTasks) {
    res.status(200).json({
      success: true,
      data: allTasks,
      message: `${allTasks.length} Task(s) fetched successfully`,
    });
  } else {
    res.status(401).json({
      success: false,
      data: null,
      message: "Tasks are Not Found",
    });
  }
});
