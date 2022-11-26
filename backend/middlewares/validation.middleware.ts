import { checkSchema, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const schemaValidator =  checkSchema({
    firstName: {
        isLength: {
            errorMessage: "max length of a first name is 10 characters and minimum length is 2 characters",
            options: {max: 10,min: 2}
        },
        isString: {
            errorMessage: "first name must be a string",
        },
    },
    lastName: {
        isLength: {
            errorMessage: "max length of a first name is 10 characters and minimum length is 2 characters",
            options: {max: 10,min: 2}
        },
        isString: {
            errorMessage: "first name must be a string",
        },
    },
    username: {
        isEmail: {
            errorMessage: "invalid email address"
        }
    },
    password: {
        isLength: {
            errorMessage: "password length must be between 4-15 charactars",
            options: {min: 4, max: 15}
        },
        custom: {
            options: (value)=>{
                return value.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i");
            }
        }
    },
    role: {
        isLength: {
            options: {min: 4, max: 4}
        }, 
        isInt: true
    }
})

export const validationMiddleware = (req: Request, res: Response, next: NextFunction)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
}