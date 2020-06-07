// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite',
    connection: {
      filename: './dev'
    },
    migrations: { directory: './migrations' },
    seeds: { directory: './seeds' }
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
