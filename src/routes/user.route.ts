import express, { Request, Response } from 'express'
import { UsersController } from '../controllers/user.controller'
import { UserService } from '../services/user.service'
import { validateReqBody, validateReqParams } from '../common/validation.middleware'
import { FilterUsersParams } from '../bodies/filter-users.params'
import { UserBody } from '../bodies/user.body'

export const usersRouter = express.Router()

const usersService = new UserService()
const usersController = new UsersController(usersService)

usersRouter.get('/', validateReqParams(FilterUsersParams), async (req: Request, res: Response) => {
  await usersController.getUsers(req, res)
})

usersRouter.put('/', async (req: Request, res: Response) => {
  await usersController.updateUser(req, res)
})

usersRouter.delete('/user/:id', async (req, res) => {
  await usersController.deleteUser(req, res)
})
