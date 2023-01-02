import { Request, Response } from 'express'
import { NewUserBody } from '../bodies/new-user.body'
import { AuthService } from '../services/auth.service'
import { UserService } from '../services/user.service'

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
    const token = await authService.login(email, password)
    const greetingMessage = {
      message: `Hello ${email}!`,
    }

    res.cookie('token', token, { maxAge: 36000 }).status(200)
    res.status(200).send(greetingMessage)
  }

  async logout(req: Request, res: Response) {
    res.cookie('token', '', { maxAge: 0 })
    res.status(204).end()
  }

  async refreshToken(req: Request, res: Response) {
    const current_token = req.cookies.token
    const token = await authService.refreshUsersToken(current_token)
    const refreshedMessage = {
      message: 'Previous JWT token were changed',
      from: current_token,
      to: token,
    }
    res.cookie('token', token, { maxAge: 36000 }).status(200)
    res.status(200).send(refreshedMessage)
  }
}
