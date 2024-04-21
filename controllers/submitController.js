import QuesModel from "../models/Ques.js";

const quizResult = async (req, res, next) => {
  try {
    const answers = req.body;
    if (!answers) {
      return res.status(400).json({ ques });
    }

    const ques = await QuesModel.find();
    const changedFormat = ques.reduce((acc, obj) => {
      acc[obj._id] = obj.answerId;
      return acc;
    }, {});

    const wrongQues = [];
    const wrongAnswers = {};

    for (let answer of answers) {
      let correctAnswer = changedFormat[answer.ques_id];
      let submittedAnswer = answer.selected_id;

      if (Number(correctAnswer) !== Number(submittedAnswer)) {
        wrongQues.push(answer.ques_id);
        wrongAnswers[answer.ques_id] = correctAnswer;
      }
    }

    return res.status(200).json({ wQues: wrongQues, wAns: wrongAnswers });
  } catch (error) {
    next(error);
  }
};

export { quizResult };
