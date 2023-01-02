import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
const config = process.env

export const verifyUserToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token || req.headers['x-access-token']

  if (!token) {
    return res.status(401).end('A token is required for this action')
  }

  try {
    jwt.verify(token, config.JWT_TOKEN_KEY!)
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).end('Invalid Token')
    }
    res.status(400).end('Error occured')
  }

  next()
}
