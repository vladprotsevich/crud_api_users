import express from 'express'
import bodyParser from 'body-parser'

import { UserService } from './services/users/user.service'

const app = express()

app.use(bodyParser.json())

const usersService = new UserService()

app.get('/users', async (req, res) => {
  const users = await usersService.getUsers()
  res.json(users)
})

app.post('/user', async (req, res) => {
  const user = await usersService.addUser(req)
  res.json(user)
})

app.delete('/user/:id', async (req, res) => {
  const id = req.body.id
  const user = await usersService.removeUser(id)
  res.json(user)
})

app.put('/users', async (req, res) => {
  const user = await usersService.updateUser(req)
  res.json(user)
})

const port = 3000

app.listen(port, () => {
  console.log('Server is waiting connection...')
})
