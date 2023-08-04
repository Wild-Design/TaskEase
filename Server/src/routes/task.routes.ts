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
router.delete('/:taskId', deleteTask);
router.put('/:taskId/:destinationListId', transferTask);

export default router;
