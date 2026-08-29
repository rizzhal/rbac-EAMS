import express from "express";
import authRoute from "./routes/authRoute.js";
import taskRoute from "./routes/taskRoute.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);

export default app;