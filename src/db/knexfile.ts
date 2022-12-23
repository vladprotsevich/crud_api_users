// Update with your config settings.
import dotenv from 'dotenv'
dotenv.config()

export const config = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.PORT,
    },
    migrations: {
      extension: 'ts',
      directory: './migrations',
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true,
  },
} as Record<string, any>

export default config
