import { Router } from 'express';
import { getTask, createTask, deleteTask } from '../controllers/task.js';

const router = Router();

router.get('/', getTask);
router.post('/', createTask);
router.delete('/:taskId', deleteTask);

export default router;
