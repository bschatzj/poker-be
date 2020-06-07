exports.up = knex =>
knex.schema.createTable('users', table => {
  table.increments('id')
  table.text('password').notNullable()
  table.text('username').notNullable().unique()
  table.integer('chips').defaultTo(1000)
})

exports.down = knex => knex.schema.dropTableIfExists('users')