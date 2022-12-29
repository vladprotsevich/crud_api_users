import { Request, Response } from 'express'
import { validateOrReject } from 'class-validator'
import { NextFunction } from 'express'
import { plainToClassFromExist } from 'class-transformer'

export const validateReqBody = (ClassType: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const obj = new ClassType()
    const req_body = plainToClassFromExist(obj, req.body)
    await validateOrReject(req_body)
    next()
  } catch (err) {
    next(err)
  }
}

export const validateReqParams = (ClassType: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const obj = new ClassType()
    const params_body = plainToClassFromExist(obj, req.query)
    await validateOrReject(params_body)

    req.query = params_body
    next()
  } catch (err) {
    console.log('Error: ', err)
    res.send(err)
  }
}
