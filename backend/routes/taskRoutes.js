const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const authMiddleware =
require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      user: req.user.id
    });

    await task.save();

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {

    const tasks =
      await Task.find({
        user: req.user.id
      });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {

    const task =
      await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    task.title =
      req.body.title || task.title;

    task.completed =
      req.body.completed ??
      task.completed;

    await task.save();

    res.json(task);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {

    const task =
      await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    await task.deleteOne();

    res.json({
      message: "Task deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;