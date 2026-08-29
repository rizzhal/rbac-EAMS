import User from "../models/UserSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signupAuth = async (req , res) => {
    try {
       const {name , email, password, age, } = req.body
       if(!name || !email || !password || age === undefined || age === null){
        return res.status(400).json({ message: "Please provide your signup details!" });
       } 
       const existingUser = await User.findOne({email: email}) 
       if(existingUser){
        return res.status(409).json({ message: "User already exists" })
       }
       const saltRounds = 10
       const hashedPassword = await bcrypt.hash(password , saltRounds)
       const user = new User({
        name,
        email,
        password: hashedPassword,
        age
       });
       await user.save();
       return res.status(201).json({
        message: "User registered successfully"
       });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" })
    }
}

export const signinAuth = async (req , res) => {
    try {
    const {email, password} = req.body;
    if(!(email && password )){
        return res.status(400).json({message: "Please provide your signIn details"})
    }
    const existingUser = await User.findOne({email});
    if(!existingUser){
        return res.status(400).json({message: "User not found"})
    }
    const comparePassword = await bcrypt.compare(password, existingUser.password)
    if(!comparePassword){
        return res.status(400).json({message: "Wrong password"})
    }
    const token = jwt.sign(
        {
          userId: existingUser._id ,
          role: existingUser.role  
        },
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
     )

     res.cookie("token" , token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production'
     })
     return res.status(200).json({message: "login successfull"})
      } catch (error) {
        console.error(error.message);
        return res.status(500).json("Internal server error")
    }
}

export const getCurrentUserAuth = async (req , res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if(!user){
            return res.status(401).json({message: "Not authorized"})
        }
        return res.status(200).json({user})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Internal server error"})
    }
}

export const logoutAuth = async (req , res) => {
    res.clearCookie("token" , {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production'
    })
    return res.status(201).json({message: "logged out successfully"})
}
