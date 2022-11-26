import { checkSchema, validationResult } from 'express-validator';
import { createSchema, loginSchema, updateSchema } from '../utils/validation_schemas/validationSchemas';
import { Request, Response, NextFunction } from 'express';

//express validator check on a create user schema
export const createSchemaValidator = checkSchema(createSchema);

//express validator check on a update user schema
export const updateSchameValidator =  checkSchema(updateSchema);

//express validator check on a login schema
export const loginSchemaValidator = checkSchema(loginSchema);


/**
 * The validation middleware will be in charge of making sure that the data schemas 
 * arriving to the api are correct and meets the data structure requirements.
 * @param req express resquest object
 * @param res express response object
 * @param next express next function
 * @returns possible data validation rejection array
 */
export const validationMiddleware = (req: Request, res: Response, next: NextFunction)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
}