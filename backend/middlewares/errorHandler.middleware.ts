import { Request, Response, NextFunction, ErrorRequestHandler } from "express"

export default function errorHandler (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    return res.status(500).send('something went wrong');
  }