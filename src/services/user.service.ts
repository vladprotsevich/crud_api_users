import { db } from '../db/db.provider'
import { AddNewUserBody } from '../bodies/add-new-user.body'
import { validateOrReject } from 'class-validator'
import { FilterUsersParams } from '../bodies/filter-users.params'
import { Knex } from 'knex'
import { User } from '../interfaces/user.interface'
export class UserService {
  userDb() {
    return db('users')
  }

  private static filterUsers(params: FilterUsersParams, query: Knex.QueryBuilder) {
    params.name && query.andWhere('name', params.name)
    params.email && query.andWhere('email', params.email)
    params.age && query.andWhere('age', params.age)
    params.country && query.andWhere('country', params.country)
  }

  getAllUsers(params: FilterUsersParams) {
    const query = this.userDb().select('id', 'name', 'email', 'age', 'country')
    UserService.filterUsers(params, query)
    params.limit && query.limit(params.limit)
    params.offset && query.offset(params.offset)
    params.sort && query.orderBy('created_at', params.sort)

    return query
  }

  async getUserByEmail(email: string) {}

  async gelAllUsersCount(params: FilterUsersParams) {}

  async addNewUser(body: AddNewUserBody) {
    return await this.userDb().insert(body).returning('*')
  }

  async updateUserInfo(body: AddNewUserBody) {
    try {
      const id = body.id
      await this.userDb().update(body).where({ id: id })
      return await db('users').select().where({ id: id })
    } catch (err) {
      console.log(`Update user failed. ${err} occured.`)
    }
  }

  async removeUser(id: number) {
    try {
      await this.userDb().where({ id: id }).del()
      return `User with id '${id}' were removed from db`
    } catch (err) {
      console.log(`Removing user failed. ${err} occured.`)
    }
  }
}
