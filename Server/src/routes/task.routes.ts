import { Router } from 'express';
import { getTask, createTask } from '../controllers/task.js';

const router = Router();

router.get('/', getTask);
router.post('/', createTask);

export default router;
