import { Request, Response } from 'express'
import { NewUserBody } from '../bodies/new-user.body'
import { AuthService } from '../services/auth.service'
import { UserService } from '../services/user.service'
import dotenv from 'dotenv'

const userService = new UserService()
const authService = new AuthService(userService)

export class AuthController {
  async registerUser(req: Request, res: Response) {
    const regBody: NewUserBody = await req.body
    const user = await authService.register(regBody)
    res.status(201).send(user)
  }

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body
    const token_info = await authService.login(email, password)
    const greetingMessage = {
      message: `Hello ${email}!`,
      your_access_token: token_info?.access_token,
      your_refresh_token: token_info?.refresh_token,
    }

    res.cookie('token', token_info?.access_token, { maxAge: 60000 * 60 }).status(200)
    res.status(200).send(greetingMessage)
  }

  async logout(req: Request, res: Response) {
    const access_token = req.cookies.token
    await authService.logoutUser(access_token)
    res.cookie('token', '', { maxAge: 0 })
    res.status(204).end()
  }

  async refreshToken(req: Request, res: Response) {
    const { email, refresh_token } = req.body

    const token = await authService.refreshUsersToken(email, refresh_token)

    if (!token) {
      res.status(401).end('Invalid refresh token')
    } else {
      res.cookie('token', token, { maxAge: 60000 * 60 }).status(200)
      res.send({
        message: 'Token refreshed',
      })
    }
  }
}
