import { Router } from "express";
import { loginUser, refreshToken } from "../controllers/userController.js";
const router = Router();

router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);

export const userRouter = router;