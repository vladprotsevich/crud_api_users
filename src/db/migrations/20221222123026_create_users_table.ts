import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', function (table: Knex.TableBuilder) {
    table.increments('id').unique()
    table.string('email', 255).unique()
    table.string('name', 255)
    table.timestamps({
      defaultToNow: true,
      useTimestamps: true,
    })
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
