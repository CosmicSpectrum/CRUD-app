import { Request, Response, NextFunction } from "express";

/**
 * The admin validation middleware is in charge of making sure only system admins are capable
 * of using routes that manipulate and change the db.
 * it'll sit on routes like: create, delete and edit.
 * @param req express request object
 * @param res express response object
 * @param next express next function
 * @returns possible forbbiden rejection, in case the user accessing isn't an admin
 */
export default function adminMiddleware(req: Request, res: Response, next: NextFunction){
    if(req.userData){
        if(req.userData.role){
            next();
        }else{
            return res.status(403).send('forbbiden action');
        }
    }else{
        return res.status(401).send('unauthorized');
    }
}