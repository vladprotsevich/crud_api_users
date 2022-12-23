import { Knex } from 'knex'

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (table: Knex.TableBuilder) {
    table.increments('id').unique()
    table.string('email', 255)
    table.string('name', 255)
    table.string('surname', 255)
    table.integer('age')
    table.timestamps()
  })
}
