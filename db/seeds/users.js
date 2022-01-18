/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("users")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("users").insert([
				{ username: "jhon", email: "jhon@test.com", password: "1234" },
				{ username: "peter", email: "peter@test.com", password: "1234" },
				{
					username: "nelson",
					email: "nelson@test.com",
					password: "1234",
				},
			]);
		});
};
