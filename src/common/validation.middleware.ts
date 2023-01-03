import { Request, Response } from 'express'
import { validateOrReject } from 'class-validator'
import { NextFunction } from 'express'
import { plainToClassFromExist } from 'class-transformer'
import { db } from '../db/db.provider'

export const validateCreadentials = (ClassType: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await db('users').where('email', req.body.email).returning('*')

    if (!user[0]) {
      throw new Error(`${req.body.email} isn't signed up`)
    }

    const obj = new ClassType()
    const req_body = plainToClassFromExist(obj, req.body)
    await validateOrReject(req_body)
    next()
  } catch (err) {
    const errorMessage = {
      message: 'One of requirement fields is incorrect.',
    }
    next(errorMessage)
  }
}

export const validateReqBody = (ClassType: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await db('users').where('email', req.body.email).returning('*')

    if (!!user[0]) {
      throw new Error(`${req.body.email} were already used. Select another one`)
    }
    const obj = new ClassType()
    const req_body = plainToClassFromExist(obj, req.body)
    await validateOrReject(req_body)
    next()
  } catch (err: any) {
    const message = err.message ? err.message : err[0]
    next(message)
  }
}

export const validateReqParams = (ClassType: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const obj = new ClassType()
    const params_body = plainToClassFromExist(obj, req.query)
    await validateOrReject(params_body)

    req.query = params_body
    next()
  } catch (err: any) {
    const message = {
      message: err.message,
    }
    next(message)
  }
}
