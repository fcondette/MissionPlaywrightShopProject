import { faker } from "@faker-js/faker";

export function existingUser() {
	return {
		fullName: "John Doe2",
		email: "john.doe2@example.com",
		password: "Test12345!",
	};
}

export function nonRegisteredUser() {
	return {
		fullName: "Jack Jones",
		email: "jack@test.com",
		password: "jack12345!",
	};
}

export function generateUser() {
	return {
		fullName: "John Doe",
		email: `john.doe+${Date.now()}@example.com`,
		password: "Test12345!",
	};
}

export function generateInvalidUser() {
	return {
		fullName: "James Smith",
		email: "james.smith@test.c",
		password: "Test123456!",
	};
}

export function generateUserFaker() {
	return {
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		password: faker.internet.password({ length: 12 }),
	};
}
