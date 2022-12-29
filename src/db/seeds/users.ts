import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  await knex('users').insert([
    { email: 'lantunde@acbo.va', name: 'Hettie Marshall', country: 'Ukraine', age: 19 },
    { email: 'zo@girih.lv', name: 'Hester Owens', country: 'Canada', age: 13 },
    { email: 'bekamohi@owo.mt', name: 'Alex Spilberg', country: 'USA', age: 17 },
    { email: 'bekadas@owo.mt', name: 'Nikola Example', country: 'Ukraine', age: 62 },
    { email: 'be34i@owo.mt', name: 'Harry Santra', country: 'USA', age: 33 },
  ])
}
