import { Request, Response } from "express";
import userModel from "../models/user.model";
import {validationResult } from 'express-validator';


export default class UserController{
    static create(req: Request, res: Response){
       
    }

    static read(req: Request,res: Response){
        res.send('peace')
    }

    static update(req: Request,res: Response){

    }

    static delete(req: Request,res: Response){

    }

}