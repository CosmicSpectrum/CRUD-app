import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import authorizationMiddleware from "../middlewares/authorization.middleware";
import { loginSchemaValidator, validationMiddleware } from "../middlewares/validation.middleware";
const router = Router();

router.post('/login',loginSchemaValidator, validationMiddleware,AuthController.login);

router.get('/me', authorizationMiddleware, AuthController.me);

export default router;