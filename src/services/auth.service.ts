import { NewUserBody } from '../bodies/new-user.body'
import { UserService } from './user.service'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '../db/db.provider'
import { UserBody } from '../bodies/user.body'
import dotenv from 'dotenv'

dotenv.config() // if i remove this line, i will get 'Error: secretOrPrivateKey must have a value'
export class AuthService {
  constructor(private userService: UserService) {}

  async register(body: NewUserBody) {
    const ecnrypted_password = await this.encryptUserPassword(body.password)
    body.password = ecnrypted_password

    return await this.userService.addNewUser(body)
  }

  async login(email: string, password: string) {
    const user = await db('users').where('email', email).first()

    if (user && (await this.decryptUserPassword(password, user))) {
      const access_token = await this.createJWTAccessToken(user.id, user.email)
      const refresh_token = await this.createJWTRefreshToken(user.id, user.email)

      await db('users').where('email', email).first().update('refresh_token', refresh_token)

      const token = {
        access_token: access_token,
        refresh_token: refresh_token,
      }
      return token
    }
  }

  async logoutUser(access_token: string) {
    const user = await this.parseJWTToken(access_token)
    await db('users').where('id', user.user_id).update('refresh_token', null)
  }

  async encryptUserPassword(password: string) {
    return await bcrypt.hash(password, 10)
  }

  async decryptUserPassword(password: string, user: UserBody) {
    return await bcrypt.compare(password, user.password!)
  }

  async createJWTAccessToken(id: any, email: any) {
    const jwt_secret_key = process.env.JWT_TOKEN_KEY
    return jwt.sign({ user_id: id, email }, jwt_secret_key!, { expiresIn: '1h' })
  }

  async createJWTRefreshToken(id: any, email: any) {
    const jwt_secret_key = process.env.JWT_TOKEN_REFRESH_KEY
    return jwt.sign({ user_id: id, email }, jwt_secret_key!, { expiresIn: '24h' })
  }

  async parseJWTToken(token: string) {
    const decoded_token = Buffer.from(token.split('.')[1], 'base64').toString()
    return await JSON.parse(decoded_token)
  }

  async refreshUsersToken(email: string, token: string) {
    const user = await db('users').where('email', email).first()

    if (user.refresh_token === token) {
      const parsed_token = await this.parseJWTToken(token)

      const refresh_token = this.createJWTRefreshToken(parsed_token.user_id, parsed_token.email)

      await db('users').where('id', parsed_token.user_id).update('refresh_token', refresh_token)
      return await this.createJWTAccessToken(parsed_token.user_id, parsed_token.email)
    }
  }
}
