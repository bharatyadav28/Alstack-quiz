import QuesModel from "../models/Ques.js";

const AddNewQues = async (req, res, next) => {
  try {
    const ques = await QuesModel.create(req.body);
    return res.status(201).json({ ques });
  } catch (error) {
    next(error);
  }
};

const getAllQues = async (req, res, next) => {
  try {
    const ques = await QuesModel.find();
    return res.status(200).json({ questions: ques, count: ques.length });
  } catch (error) {
    next(error);
  }
};

export { AddNewQues, getAllQues };
