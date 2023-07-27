import { Router } from 'express';
import { getList, createList } from '../controllers/list.js';
const router = Router();
router.get('/', getList);
router.post('/:listName', createList);
export default router;
