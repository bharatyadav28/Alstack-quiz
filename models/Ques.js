import mongoose from "mongoose";

const optionsSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  value: {
    type: String,
    trim: true,
    required: true,
  },
});

const QuesSchema = mongoose.Schema({
  ques: {
    type: String,
    required: [true, "Please provide question."],
    minLength: [5, "Question cannot have length less than 5"],
    trim: true,
  },
  options: [optionsSchema],
  answerId: {
    type: Number,
    required: [true, "Please provide answerId."],
  },
});

const QuesModel = mongoose.model("ques", QuesSchema);

export default QuesModel;
