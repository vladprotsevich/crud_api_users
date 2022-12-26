import dotenv from 'dotenv'

const environment = process.env.NODE_ENV || 'development'

dotenv.config({ path: environment === 'development' ? '.env' : 'production.env' })

export const config = {
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
    tableName: 'knex_migrations',
  },
  useNullAsDefault: true,
} as Record<string, any>

export default config
