import { User } from '../interfaces/user.interface'
import { db } from '../db/db.provider'

export class UserService {
  async getAllUsers() {
    try {
      return await db<User>('users').select('id', 'name', 'email')
    } catch {
      console.log('You dont have any users yet')
    }
  }

  async addNewUser(body: Object) {
    try {
      const id = await db('users').insert(body, 'id')
      return db('users').select().where(id[0])
    } catch (err) {
      console.log(`Create user failed. ${err} occured.`)
    }
  }

  async updateUserInfo(body: Object) {
    try {
      const id = body['id' as keyof Object]
      await db('users').where({ id: id }).update(body)
      return await db('users').select().where({ id: id })
    } catch (err) {
      console.log(`Update user failed. ${err} occured.`)
    }
  }

  async removeUser(id: number) {
    try {
      await db('users').where({ id: id }).del()
      return `User with id '${id}' were removed from db`
    } catch (err) {
      console.log(`Removing user failed. ${err} occured.`)
    }
  }
}
