import express from "express";

import { AddNewQues, getAllQues } from "../controllers/quizController.js";

const router = express.Router();
router.route("/").post(AddNewQues).get(getAllQues);

export default router;
