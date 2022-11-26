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
        const token = req.headers['x-user-token'] ?? req.cookies['user-token'];
        
        if(token){
            const userData = auth.verifyToken(<string>token); 
            
            req.userData = userData;
            next();
        }else{
            return res.status(401).send('Unauthorized')
        }
    }catch(err){
        return res.status(401).send('unauthorized');
    }
}