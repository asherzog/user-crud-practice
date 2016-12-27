
exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM sticker; ALTER SEQUENCE sticker_id_seq RESTART WITH 1')
    .then(function () {
      let stickers = [
        {
          image_url: 'https://cdn.shopify.com/s/files/1/0154/2777/products/handlebars-detail_1_medium.jpg?v=1336174336',
          description: 'Handlebars mustache',
          user_id: 1
        },
        {
          image_url: 'https://cdn.shopify.com/s/files/1/0154/2777/products/ember-hamster-detail-eb_medium.png?v=1398710813',
          description: 'Ember logo',
          user_id: 1
        },
        {
          image_url: 'https://cdn.shopify.com/s/files/1/0154/2777/products/sass-detail-02_medium.jpg?v=1411152591',
          description: 'SASS',
          user_id: 2
        },
        {
          image_url: 'https://cdn.shopify.com/s/files/1/0154/2777/products/grunt-detail_medium.jpg?v=1388345615',
          description: 'GRUNT logo',
          user_id: 2
        }
      ];
      return knex('sticker').insert(stickers);
    });
};
