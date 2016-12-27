exports.up = function(knex, Promise) {
  return knex.schema.createTable('sticker', table => {
    table.increments();
    table.text('image_url').notNullable();
    table.text('description');
    table.integer('user_id').references('user.id').unsigned().onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sticker');
};
