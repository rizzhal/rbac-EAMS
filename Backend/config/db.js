import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const connString = process.env.MONGO_URI;
        if(!connString){
            throw new Error ("Please provide database connection string")
        }
       await mongoose.connect(connString)
       console.log("db connected")
    } catch (error) {
        console.error(error.message)
        process.exit(1);
    }
}
