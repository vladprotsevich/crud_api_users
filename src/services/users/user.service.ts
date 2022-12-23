import { User } from './interfaces/user.interface'
import { db } from '../../db/db.provider'

export class UserService {
  async getUsers() {
    return await db<User>('users').select('id', 'name', 'surname', 'age')
  }

  async addUser(req: any) {
    try {
      const name = req.body.name ? req.body.name : ''
      const surname = req.body.surname ? req.body.surname : ''
      const email = req.body.email ? req.body.email : ''
      const age = req.body.age ? req.body.age : ''

      const id = await db('users').insert({ name, surname, email, age }, 'id')

      const user = await db('users').select().where(id[0])

      return user
    } catch (err) {
      console.error(err)
    }
  }

  async removeUser(id: number) {
    try {
      const user = await db('users').select().where({ id: id }).del()

      return user
    } catch (err) {
      console.log(err)
    }
  }

  async updateUser(req: any) {
    try {
      const id = req.body.id
      await db('users').where({ id: id }).update(req.body)
      return await db('users').select().where({ id: id })
    } catch (err) {
      console.log(err)
    }
  }
}
