import express from "express";
import "dotenv/config";
import "express-json";
import path from "path";
import url from "url";
import rateLimiter from "express-rate-limit";

import dbConnect from "./db/connect.js";
import quesRouter from "./routes/quizRoutes.js";
import submitRouter from "./routes/submitRoutes.js";
import NotFoundMiddleware from "./middlewares/NotFound.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";

const app = express();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

app.use("/api/v1/ques", quesRouter);
app.use("/api/v1/submit", submitRouter);
app.use(NotFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 4000;
const startServer = () => {
  try {
    dbConnect(process.env.MONGO_URI);
    console.log("Connected to Database successfully.");
    app.listen(PORT, console.log(`Server started at http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
startServer();
