import { Request, Response } from 'express'
import { AddNewUserBody } from '../bodies/add-new-user.body'
import { Pagination } from '../common/pagionation.response'
import { UserService } from '../services/user.service'

export class UsersController {
  constructor(private usersService: UserService) {
    this.usersService = usersService
  }

  async getUsers(req: Request, res: Response) {
    const users = await this.usersService.getAllUsers(req.query)
    res.send(new Pagination(users))
  }

  async createUser(req: Request, res: Response) {
    const userBody: AddNewUserBody = req.body
    const user = await this.usersService.addNewUser(userBody)
    res.send(user)
  }

  async updateUser(req: Request, res: Response) {
    const body: AddNewUserBody = req.body
    const updatedUser = await this.usersService.updateUserInfo(body)
    res.send(updatedUser)
  }

  async deleteUser(req: Request, res: Response) {
    const userId: number = req.body.id
    const removedUser = await this.usersService.removeUser(userId)
    res.send(removedUser)
  }
}
