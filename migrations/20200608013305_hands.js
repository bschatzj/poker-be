exports.up = knex =>
knex.schema.createTable('hands', table =>{
    table.increments('hand_id')
    table.integer('profit')
    table.integer('id').notNullable().references('id').inTable('users')
    table.boolean('win')
    table.text('my_hand')
    table.text('opponent_hand')
    table.text('flop')
    table.text('turn')
    table.text('river') 
  })

exports.down = knex => knex.schema.dropTableIfExists('hands')    