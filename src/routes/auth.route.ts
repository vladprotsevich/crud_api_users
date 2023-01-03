import express, { Request, Response } from 'express'
import { AuthBody } from '../bodies/auth-user.body'
import { NewUserBody } from '../bodies/new-user.body'
import { validateCreadentials, validateReqBody } from '../common/validation.middleware'
import { verifyUserToken } from '../common/verifyUserToken.middleware'
import { AuthController } from '../controllers/auth.controller'

const auth = new AuthController()

export const authRouter = express.Router()

authRouter.post('/register', validateReqBody(NewUserBody), async (req: Request, res: Response) => {
  await auth.registerUser(req, res)
})

authRouter.post('/login', validateCreadentials(AuthBody), async (req: Request, res: Response) => {
  await auth.loginUser(req, res)
})

authRouter.post('/logout', verifyUserToken, async (req: Request, res: Response) => {
  await auth.logout(req, res)
})

authRouter.post('/refresh', async (req: Request, res: Response) => {
  await auth.refreshToken(req, res)
})
