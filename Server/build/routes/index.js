import { Router } from 'express';
import userRoutes from './user.routes.js';
import listRoutes from './list.routes.js';
import taskRoutes from './task.routes.js';
const router = Router();
router.get('/', (_, res) => {
    res.status(200).send('¡Welcome to TaskEase!');
});
router.use('/user', userRoutes);
router.use('/list', listRoutes);
router.use('/task', taskRoutes);
export default router;
