import mongoose from "mongoose";
const {Schema} = mongoose

const UserSchema = new Schema({
   name: {
    type: String,
    required: true,
    trim: true
   },
   email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
   },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 150
    },
    password: {
        type: String,
        required: true,    
    },
    role: {
        type: String,
        enum: ['employee' , 'admin'],
        default: 'employee'
    }
}, {
    timestamps: true
})

const User = mongoose.model('User' , UserSchema)

export default User;