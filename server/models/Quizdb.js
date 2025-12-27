const mongoose = require("mongoose");
const QuizSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, 
{
  timestamps: true
});
const QuizModel = mongoose.model("Quiz", QuizSchema);
module.exports = QuizModel;