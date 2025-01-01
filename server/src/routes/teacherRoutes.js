import { Router } from "express";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.js";
import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacherById,
  deleteTeacherById
} from "../controllers/teacherController.js";

const router = Router();

router.post('/', authenticateToken, authorizeRoles('Admin'), createTeacher);
router.get('/', authenticateToken, getAllTeachers);
router.get('/:id', authenticateToken, getTeacherById);
router.put('/:id', authenticateToken, authorizeRoles('Admin'), updateTeacherById);
router.delete('/:id', authenticateToken, authorizeRoles('Admin'), deleteTeacherById);

export const teacherRouter = router;