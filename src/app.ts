import "express-async-errors";
import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("tiny"));

app.use(express.json());

export default app;
