import { Router } from "express";
import { createStudent, getStudentById, getStudents } from "../controllers/studentController.js";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.js";

const router = Router();

router.post('/', authenticateToken, authorizeRoles('Admin', 'Teacher'), createStudent)
router.get('/', authenticateToken, authorizeRoles('Admin', 'Teacher'), getStudents)
router.get('/:id', authenticateToken, authorizeRoles('Admin', 'Teacher', 'Student'), getStudentById)

export const studentRouter = router;