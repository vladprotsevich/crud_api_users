import { Request, Response } from 'express'
import { UserService } from '../services/user.service'

export class UsersController {
  constructor(private usersService: UserService) {
    this.usersService = usersService
  }

  async getUsers(req: Request, res: Response) {
    const users = await this.usersService.getAllUsers()
    res.send(users)
  }

  async createUser(req: Request, res: Response) {
    const userBody: Object = req.body
    const user = await this.usersService.addNewUser(userBody)
    res.send(user)
  }

  async updateUser(req: Request, res: Response) {
    const body: Object = req.body
    const updatedUser = await this.usersService.updateUserInfo(body)
    res.send(updatedUser)
  }

  async deleteUser(req: Request, res: Response) {
    const userId: number = req.body.id
    const removedUser = await this.usersService.removeUser(userId)
    res.send(removedUser)
  }
}
