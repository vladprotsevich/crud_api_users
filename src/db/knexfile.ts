// Update with your config settings.


export const config = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'users_development',
      user: 'vladprotsevich',
      password: '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',
      port: 5432
    },
    migrations: {
      extension: 'ts',
      directory: './migrations',
      tableName: 'users_development'
    },
    useNullAsDefault: true
  }
} as Record<string, any>;

export default config;
