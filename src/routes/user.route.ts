import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { UsersController } from '../controllers/user.controller'
import { UserService } from '../services/user.service'
import { AddNewUserBody } from '../bodies/add-new-user.body'
import { validateReqBody, validateReqParams } from '../common/validation.middleware'
import { FilterUsersParams } from '../bodies/filter-users.params'

export const usersRouter = express.Router()

const usersService = new UserService()
const usersController = new UsersController(usersService)

usersRouter.use(bodyParser.json())

usersRouter.get('/', validateReqParams(FilterUsersParams), async (req: Request, res: Response) => {
  await usersController.getUsers(req, res)
})

usersRouter.post('/user', validateReqBody(AddNewUserBody), async (req: Request, res: Response) => {
  await usersController.createUser(req, res)
})

usersRouter.put('/', validateReqBody(AddNewUserBody), async (req: Request, res: Response) => {
  await usersController.updateUser(req, res)
})

usersRouter.delete('/user/:id', async (req, res) => {
  await usersController.deleteUser(req, res)
})
