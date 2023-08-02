import { Router } from 'express';
import {
  getList,
  createList,
  deleteList,
  updateListName,
} from '../controllers/list.js';

const router = Router();

router.get('/', getList);
router.put('/:listId', updateListName);
router.delete('/:listId', deleteList);
router.post('/:listName', createList);

export default router;
