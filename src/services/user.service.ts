import { db } from '../db/db.provider'
import { NewUserBody } from '../bodies/new-user.body'
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

  async addNewUser(body: NewUserBody) {
    return await this.userDb().insert(body).returning('*')
  }

  async updateUserInfo(body: NewUserBody) {
    return await this.userDb().update(body).where({ id: body.id }).returning('*')
  }

  async removeUser(id: number) {
    await this.userDb().where({ id: id }).del()
    return `User with id '${id}' were removed from db`
  }
}
