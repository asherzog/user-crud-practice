
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', table => {
    table.increments();
    table.text('name').notNullable();
    table.integer('age').notNullable();
    table.text('email').unique().notNullable();
    table.text('password').notNullable();
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
