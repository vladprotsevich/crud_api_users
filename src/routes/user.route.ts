import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { UsersController } from '../controllers/user.controller'
import { UserService } from '../services/user.service'

export const usersRouter = express.Router()

const usersService = new UserService()
const usersController = new UsersController(usersService)

usersRouter.use(bodyParser.json())

usersRouter.get('/', async (req: Request, res: Response) => {
  await usersController.getUsers(req, res)
})

usersRouter.post('/user', async (req: Request, res: Response) => {
  await usersController.createUser(req, res)
})

usersRouter.put('/', async (req: Request, res: Response) => {
  await usersController.updateUser(req, res)
})

usersRouter.delete('/user/:id', async (req, res) => {
  await usersController.deleteUser(req, res)
})
