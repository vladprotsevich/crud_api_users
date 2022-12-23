import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {id: 1, email: 'lantunde@acbo.va', name: 'Hettie Marshall', surname: 'Surname', age: 19},
        {id: 2, email: 'zo@girih.lv', name: 'Hester Owens', surname: 'Surname', age: 13},
        {id: 3, email: 'bekamohi@owo.mt', name: 'Henry Jackson', surname: 'Surname', age: 32}
    ]);
};
