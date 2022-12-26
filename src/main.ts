import bodyParser from 'body-parser'
import express from 'express'
import { usersRouter } from './routes/user.route'

const app = express()

app.use(bodyParser.json())

app.use('/users', usersRouter)

app.listen(3000, () => {
  console.log('Server is waiting connection...')
})
