import { Router } from "express";
import UserController from "../controllers/users.controller";
import {schemaValidator,validationMiddleware} from "../middlewares/validation.middleware";
import authorizationMiddleware from "../middlewares/authorization.middleware";
import adminMiddleware from "../middlewares/admin.middleware";

const router = Router();

router.use(authorizationMiddleware);

router.post('/create',schemaValidator, [adminMiddleware, validationMiddleware], UserController.create);

router.get('/read', UserController.read);

router.patch('/update', [adminMiddleware, validationMiddleware], UserController.update);

router.delete('/delete',adminMiddleware, UserController.delete);

export default router;
