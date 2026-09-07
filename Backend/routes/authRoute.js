import express from "express"
import { getCurrentUserAuth, logoutAuth, signinAuth, signupAuth } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/signup" , signupAuth)
router.post("/signin" , signinAuth)
router.get("/me", authMiddleware, getCurrentUserAuth )
router.post("/logout" , logoutAuth)


export default router;