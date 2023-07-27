import { Router } from 'express';
import { getTask } from '../controllers/task.js';

const router = Router();

router.get('/', getTask);

export default router;
