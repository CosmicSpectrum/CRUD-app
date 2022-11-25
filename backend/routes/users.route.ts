import { Router } from "express";
import UserController from "../controllers/users.controller";

const router = Router();


router.post('/create', UserController.create);

router.get('/read', UserController.read);

router.patch('/update', UserController.update);

router.delete('/delete', UserController.delete);

export default router;
