import bodyParser from 'body-parser'
import express from 'express'
import { globalErrorHandler } from './common/global.error.handler'
import { authRouter } from './routes/auth.route'
import cookieParser from 'cookie-parser'
import { usersRouter } from './routes/user.route'
import { verifyUserToken } from './common/verifyUserToken.middleware'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/auth', authRouter)

app.use('/users', verifyUserToken, usersRouter)

app.use(globalErrorHandler)

app.listen(3000, () => {
  console.log('Server is waiting connection...')
})
