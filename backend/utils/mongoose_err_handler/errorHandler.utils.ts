import { Response } from "express";

export default function errorHandler(err:any, res: Response){
    if(err.code === 11000){
        return res.status(400).json({errors: ['emailAddress']});
    }else{
        return res.status(500).send('something went wrong');
    }
}