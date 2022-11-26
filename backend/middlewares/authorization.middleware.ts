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


/**
 * The authorization middleware is in charge of making sure
 * that non authorized users will not access the api.
 * this middleware function will sit on relevant routes and will look for 
 * the user token cookie in order to verify it's validness.
 * @param req express request object
 * @param res express response object
 * @param next express next function
 * @returns possible autorization rejection
 */
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