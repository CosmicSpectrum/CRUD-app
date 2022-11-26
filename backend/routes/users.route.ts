import { Router } from "express";
import UserController from "../controllers/users.controller";
import {createSchemaValidator,updateSchameValidator,validationMiddleware} from "../middlewares/validation.middleware";
import authorizationMiddleware from "../middlewares/authorization.middleware";
import adminMiddleware from "../middlewares/admin.middleware";

const router = Router();

router.use(authorizationMiddleware);

router.post('/create',createSchemaValidator, [adminMiddleware, validationMiddleware], UserController.create);

router.get('/read', UserController.read);

router.patch('/update',updateSchameValidator, [adminMiddleware, validationMiddleware], UserController.update);

router.delete('/delete',adminMiddleware, UserController.delete);

export default router;
