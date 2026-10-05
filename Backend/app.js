import express from "express";
import authRoute from "./routes/authRoute.js";
import taskRoute from "./routes/taskRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
const allowedOrigins = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(",").map((origin) => origin.trim())
    : ["http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);

export default app;