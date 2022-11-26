import { checkSchema, validationResult } from 'express-validator';
import { createSchema, loginSchema, updateSchema } from '../utils/validation_schemas/validationSchemas';
import { Request, Response, NextFunction } from 'express';

export const createSchemaValidator = checkSchema(createSchema);

export const updateSchameValidator =   checkSchema(updateSchema);

export const loginSchemaValidator = checkSchema(loginSchema);

export const validationMiddleware = (req: Request, res: Response, next: NextFunction)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
}