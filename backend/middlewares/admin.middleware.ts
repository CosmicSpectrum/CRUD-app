import { Request, Response, NextFunction } from "express";

export default function adminMiddleware(req: Request, res: Response, next: NextFunction){
    if(req.userData){
        
        if(req.userData.role === process.env.ADMIN_ROLE){
            next();
        }else{
            return res.status(403).send('forbbiden action');
        }
    }else{
        return res.status(401).send('unauthorized');
    }
}