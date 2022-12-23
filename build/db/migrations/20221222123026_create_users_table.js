"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.down = void 0;
async function down(knex) {
    return knex.schema
        .dropTable('users');
}
exports.down = down;
async function up(knex) {
    return knex.schema
        .createTable('users', function (table) {
        table.increments('id').unique();
        table.string('email', 255);
        table.string('name', 255);
        table.string('surname', 255);
        table.integer('age');
        table.timestamps();
    });
}
exports.up = up;
//# sourceMappingURL=20221222123026_create_users_table.js.map