"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    await knex("users").del();
    await knex("users").insert([
        { id: 1, email: 'lantunde@acbo.va', name: 'Hettie Marshall', surname: 'Surname', age: 19 },
        { id: 2, email: 'zo@girih.lv', name: 'Hester Owens', surname: 'Surname', age: 13 },
        { id: 3, email: 'bekamohi@owo.mt', name: 'Henry Jackson', surname: 'Surname', age: 32 }
    ]);
}
exports.seed = seed;
;
//# sourceMappingURL=users.js.map