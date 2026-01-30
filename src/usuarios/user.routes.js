import { Router } from 'express';
import * as UserController from './user.controller.js';

const router = Router();

router.get('/monitores', UserController.getMonitores);
router.put('/:usuarioID/rol', UserController.updateRol);

export default router;