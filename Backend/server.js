import express from "express"
import dotenv from "dotenv"
import app from "./app.js";
import { connectDb } from "./config/db.js";

dotenv.config()

app.use(express.json());

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
    connectDb()
})