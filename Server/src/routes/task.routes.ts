import { Router } from 'express';
import {
  getTask,
  createTask,
  deleteTask,
  updateTaskName,
  transferTask,
} from '../controllers/task.js';

const router = Router();

router.get('/', getTask);
router.post('/', createTask);
router.put('/:taskId', updateTaskName);
router.delete('/:taskId/:user_name/:password', deleteTask);
router.put('/:taskId/:destinationListId', transferTask);

export default router;
