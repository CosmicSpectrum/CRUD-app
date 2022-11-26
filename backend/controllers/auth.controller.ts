import  { Request, Response } from "express";
import userModel from "../models/user.model";
import auth from "../utils/auth_utils/auth.utils";

export default class AuthController {
    static login(req: Request, res: Response){
        const {emailAddress, password} = req.body;
        if(emailAddress && password){
            
            userModel.findOne({emailAddress},(err:Error, user: any)=>{
                if(err) throw err;

                if(user){
                    user.comparePassword(password, (err: Error,isMatch: boolean)=>{
                        if(err) throw err;
    
                        if(isMatch){
                            return res
                            .cookie('user-token', auth.signToken({id: user._id, role: user.role}))
                            .status(200)
                            .json({status: true});
                        }else{
                            return res.status(401).json({error: 'wrong credentials'})
                        }
                    })
                }else{
                    return res.status(401).json({error: 'wrong credentials'})
                }
            })
        }else{
            return res.status(400).json({error: 'missing credentials'});
        }
    }
}