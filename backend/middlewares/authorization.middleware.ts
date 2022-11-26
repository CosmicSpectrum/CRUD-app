import { Response, Request, NextFunction } from "express";
import auth from "../utils/auth_utils/auth.utils";
import {UserData} from '../utils/interfaces/interfaces';


declare global{
    namespace Express{
        interface Request{
            userData: UserData
        }
    }
}

export default function authorizationMiddleware(req: Request,res: Response,next: NextFunction){
    try{
        if(req.headers['x-user-token']){
            const userData = auth.verifyToken(<string>req.headers['x-user-token']); 
            req.userData = userData;
            next();
        }else{
            return res.status(401).send('not authorized')
        }
    }catch(err){
        return res.status(500).json({error: err});
    }
}