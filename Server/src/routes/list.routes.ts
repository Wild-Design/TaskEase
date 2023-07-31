import { Router } from 'express';
import { getList, createList, deleteList } from '../controllers/list.js';

const router = Router();

router.get('/', getList);
router.post('/:listName', createList);
router.delete('/:listId', deleteList);

export default router;
