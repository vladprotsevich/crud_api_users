import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

export const globalErrorHandler = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    status: 500,
    message: err,
  })
  next()
}
