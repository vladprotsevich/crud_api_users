import bodyParser from 'body-parser'
import express from 'express'
import { globalErrorHandler } from './common/global.error.handler'
import { usersRouter } from './routes/user.route'

const app = express()

app.use(bodyParser.json())

app.use('/users', usersRouter)

usersRouter.use(globalErrorHandler)

app.listen(3000, () => {
  console.log('Server is waiting connection...')
})
