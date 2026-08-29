import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {

    const token = req.cookies?.token;
    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }
    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.user = {
            userId: decoded.userId,
            role: decoded.role
        }
        
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json({message: "Invalid or expired token"})
    }
}

export default authMiddleware;