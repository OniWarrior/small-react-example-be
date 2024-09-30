exports.up = function (knex) {
    return knex.schema
        .createTable('User', User => {
            User.increments('user_id')
            User.string('email', 30).primary()
            User.string('password', 128).notNullable()

        })
}



exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('User')
};