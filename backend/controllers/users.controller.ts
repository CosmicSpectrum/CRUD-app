import { Request, Response } from "express";
import userModel from "../models/user.model";

export default class UserController{
    
    /**
     * this route will create a new uesr in the users collection.
     * @param req express request object
     * @param res express response object
     */
    static create(req: Request, res: Response){
       const user = new userModel(req.body);
       
       user.save(err=>{
            if(err) throw err;
            return res.status(200).json(user);
       });
    }

    static read(req: Request,res: Response){
        res.send('peace')
    }

    static update(req: Request,res: Response){

    }

    static delete(req: Request,res: Response){

    }

}