import checkAccess from "../services/accessControl.js";

const authorize = (action) => {
    return (req , res, next) => {
        const allowed = checkAccess({
            user: req.user,
            action
        });

        if(!allowed){
            return res.status(403).json({
                message: "Access denied"
            })
        }
        next();
    }
}

export default authorize;