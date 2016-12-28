const knex = require('./knex')

module.exports = {
  getOne: function(id) {
    return knex('user').where('id', id).first();
  },
  getStickersByUser: function(id) {
    return knex('sticker').where('user_id', id);
  }
};