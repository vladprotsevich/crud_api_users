import { Request, Response } from 'express'
import { NewUserBody } from '../bodies/new-user.body'
import { Pagination } from '../common/pagionation.response'
import { UserService } from '../services/user.service'

export class UsersController {
  constructor(private usersService: UserService) {
    this.usersService = usersService
  }

  async getUsers(req: Request, res: Response) {
    const users = await this.usersService.getAllUsers(req.query)
    res.status(200).send(new Pagination(users))
  }

  async updateUser(req: Request, res: Response) {
    const body: NewUserBody = req.body
    const updatedUser = await this.usersService.updateUserInfo(body)
    res.status(200).send(updatedUser)
  }

  async deleteUser(req: Request, res: Response) {
    const userId: number = req.body.id
    const removedUser = await this.usersService.removeUser(userId)
    res.status(200).send(removedUser)
  }
}
