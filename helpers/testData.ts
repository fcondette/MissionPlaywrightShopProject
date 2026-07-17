// import { faker } from "@faker-js/faker";

export function generateUser() {
	return {
		fullName: "John Doe",
		email: `john.doe+${Date.now()}@example.com`,
		password: "Test12345!",
	};
}

export function existingUser() {
	return {
		fullName: "John Doe2",
		email: "john.doe2@example.com",
		password: "Test12345!",
	};
}

// export function generateUser() {
// return {
// 	fullName: faker.person.fullName(),
// 	email: faker.internet.email(),
// 	password: faker.internet.password({ length: 12 }),
// };
// export function generateCheckoutData() {
// 	return {
// 		nom: faker.person.fullName(),
// 		adresse: faker.location.streetAddress(),
// 		ville: faker.location.city(),
// 		codepostal: faker.location.zipCode(),
// 	};
