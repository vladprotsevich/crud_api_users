import { db } from '../config'

export const config = {
  client: 'pg',
  connection: db.connection,
  migrations: db.migrations,
  useNullAsDefault: true,
} as Record<string, any>

export default config
