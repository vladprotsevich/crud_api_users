import { NextFunction, Request, Response } from 'express'

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const err_message = err.message ? err.message : err
  Array.isArray(err) ? res.status(400) : res.status(500)

  const message = {
    message: err_message,
  }
  res.send(message)
  next()
}
