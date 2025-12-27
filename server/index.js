require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const QuizModel = require("./models/Quizdb");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// 👇 ADD THIS
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// Routes
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });
  const existingUser = await QuizModel.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });
  await new QuizModel({ name, email, password }).save();
  res.status(201).json({ message: "Registration successful" });
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await QuizModel.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });
  if (user.password !== password)
    return res.status(400).json({ message: "Invalid password" });

  res.json({ message: "Login successful", user });
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));