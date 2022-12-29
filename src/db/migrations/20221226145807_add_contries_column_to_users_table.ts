import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('users', (table) => {
    table.string('country', 254)
    table.integer('age')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('users', (table) => {
    table.dropColumn('country')
    table.dropColumn('age')
  })
}
