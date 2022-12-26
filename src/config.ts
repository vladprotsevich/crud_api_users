import dotenv from 'dotenv'

const environment = process.env.NODE_ENV || 'development'
dotenv.config({ path: environment === 'development' ? '.env' : 'production.env' })

export const db = {
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT_PORT,
  },
  migrations: {
    extension: 'ts',
    directory: './migrations',
    tableName: 'knex_migrations',
  },
}
