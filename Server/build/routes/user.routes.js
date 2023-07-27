import { Router } from 'express';
import { getUser, register, login } from '../controllers/user.js';
const router = Router();
router.get('/', getUser);
router.get('/login', login);
router.post('/register', register);
export default router;
