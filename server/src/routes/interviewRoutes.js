import { Router } from "express";
import { addInterview, getInterview, getInterviewByStudent } from "../controllers/interviewController.js";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.js";

const router = Router();

router.post('/:stdId', authenticateToken, authorizeRoles('Admin', 'Teacher'), addInterview)
router.get('/:stdId', authenticateToken, getInterviewByStudent)
router.get('/', authenticateToken, authorizeRoles('Admin', 'Teacher'), getInterview)


export const interviewRouter = router 