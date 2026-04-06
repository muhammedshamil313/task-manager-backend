const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// ================= DATABASE =================
mongoose.connect("mongodb://shamilkan313_db_user:Shamil313@ac-7deetth-shard-00-00.nj2geqm.mongodb.net:27017,ac-7deetth-shard-00-01.nj2geqm.mongodb.net:27017,ac-7deetth-shard-00-02.nj2geqm.mongodb.net:27017/?ssl=true&replicaSet=atlas-zflgs2-shard-0&authSource=admin&appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ================= SCHEMA =================
const TaskSchema = new mongoose.Schema({
  title: String
});

const Task = mongoose.model("Task", TaskSchema);

// ================= ROUTES =================

// Test route
app.get("/", (req, res) => {
  res.send("Server is working");
});

// CREATE
app.post("/tasks", async (req, res) => {
  const task = new Task({ title: req.body.title });
  await task.save();
  res.json(task);
});

// READ
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// UPDATE
app.put("/tasks/:id", async (req, res) => {
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    { new: true }
  );
  res.json(updated);
});

// DELETE
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// ================= SERVER =================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
