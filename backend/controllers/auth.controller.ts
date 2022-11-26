import  { Request, Response } from "express";
import userModel from "../models/user.model";
import auth from "../utils/auth_utils/auth.utils";

export default class AuthController {

    /**
     * login function will make sure the inserted credentials are ok
     * and will sign a session token for the user.
     * @param req express request object
     * @param res express response object
     * @returns a response with http status code, and if seccessful with a session token as a cookie.
     */
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
                            .json({id: user._id, role: user.role});
                        }else{
                            return res.status(401).json({error: 'wrong credentials'})
                        }
                    })
                }else{
                    return res.status(404).json({error: 'wrong credentials'})
                }
            })
        }else{
            return res.status(400).json({error: 'missing credentials'});
        }
    }


    static me(req: Request, res: Response){
        return res.status(200).json({id: req.userData.id, role: req.userData.role});
    }
}