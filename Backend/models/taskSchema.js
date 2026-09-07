import mongoose from "mongoose"
const {Schema} = mongoose

const taskSchema = new Schema({
    title : {
        type: String,
        required: true,
        trim: true
    } ,
    description: {
        type: String,
        required: true,
        trim: true
    },
    assigned: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
       status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending"
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    }

} , {
    timestamps: true
})

const Task = mongoose.model("Task" , taskSchema);
export default Task