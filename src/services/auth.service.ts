import { NewUserBody } from '../bodies/new-user.body'
import { UserService } from './user.service'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { db } from '../db/db.provider'
import { UserBody } from '../bodies/user.body'

dotenv.config()

export class AuthService {
  constructor(private userService: UserService) {}

  async register(body: NewUserBody) {
    const ecnrypted_password = await this.encryptUserPassword(body.password)
    body.password = ecnrypted_password

    return await this.userService.addNewUser(body)
  }

  async login(email: string, password: string) {
    const user = await db('users').select('*').where('email', email).first()

    const token =
      user && (await this.decryptUserPassword(password, user)) ? await this.createJWTToken(user.email) : null

    return token
  }

  async encryptUserPassword(password: string) {
    return await bcrypt.hash(password, 10)
  }

  async decryptUserPassword(password: string, user: UserBody) {
    return await bcrypt.compare(password, user.password!)
  }

  async createJWTToken(email: any) {
    const jwt_secret_key = process.env.JWT_TOKEN_KEY
    return jwt.sign({ email }, jwt_secret_key!, { expiresIn: '1h' })
  }

  async parseJWTToken(token: string) {
    return Buffer.from(token.split('.')[1], 'base64').toString()
  }

  async refreshUsersToken(token: string) {
    const parsed_token = await this.parseJWTToken(token)
    const parsed_body = JSON.parse(parsed_token)

    return await this.createJWTToken(parsed_body.email)
  }
}
