import { Request, Response } from "express";
import userModel from "../models/user.model";
import errorHandler from "../utils/mongoose_err_handler/errorHandler.utils";

export default class UserController{

    
    /**
     * this route will create a new uesr in the users collection.
     * @param req express request object
     * @param res express response object
     */
    static create(req: Request, res: Response){
        const user = new userModel(req.body);
        
        user.save((err)=>{
            if(err){
              return errorHandler(err, res);
            }
            

            return res.status(201).json(user);
        })       
    }

    /**
     * read route will return all users to the client to show on the crud page.
     * @param req express request object
     * @param res express response object
     */
    static read(req: Request, res: Response){
        userModel.find({},['firstName','lastName','emailAddress','role'] ,
        (err: Error, users: Array<object>)=>{
            if(err) errorHandler(err, res);

            return res.status(200).json({users});
        })
    }

    /**
     * this function will update a user info in the db
     * @param req express request object
     * @param res express response object
     */
    static update(req: Request,res: Response){
        const user = req.body;

        userModel.updateOne({_id: user._id},user, (err: Error, status: object)=>{
            if(err)  errorHandler(err,res);

            return res.status(200).json(status);
        })
    }

    /**
     * this function will delete a user from the database.
     * @param req express request object
     * @param res express response object
     */
    static delete(req: Request,res: Response){
        const {_id} = req.query

        userModel.deleteOne({_id}, (err: Error, status: object)=>{
            if(err) errorHandler(err, res);

            return res.status(200).json(status);
        })
    }

}