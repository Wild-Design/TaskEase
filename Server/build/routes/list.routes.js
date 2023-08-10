import { Router } from 'express';
import { getList, createList, deleteList, updateListName, } from '../controllers/list.js';
const router = Router();
router.get('/', getList);
router.put('/:listId', updateListName);
router.delete('/:listId/:user_name/:password', deleteList);
router.post('/:listName', createList);
export default router;
