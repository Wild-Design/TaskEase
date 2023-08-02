import { Router } from 'express';
import { getTask, createTask, deleteTask, updateTaskName, } from '../controllers/task.js';
const router = Router();
router.get('/', getTask);
router.post('/', createTask);
router.put('/:taskId', updateTaskName);
router.delete('/:taskId', deleteTask);
export default router;
