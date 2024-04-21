import express from "express";

import { quizResult } from "../controllers/submitController.js";

const router = express.Router();
router.route("/").post(quizResult);

export default router;
