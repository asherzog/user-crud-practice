
exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 3')
    .then(function () {
      let users = [
        {
          id: 1,
          name: 'Andy',
          age: 25,
          email: 'andy@email.com',
          password: 'password'
        },
        {
          id: 2,
          name: 'Matt',
          age: 28,
          email: 'matt@email.com',
          password: 'password'
        }
      ];
      return knex('user').insert(users);
    });
};
