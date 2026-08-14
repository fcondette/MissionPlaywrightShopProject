import { fakerFR as faker } from "@faker-js/faker";

export function existingUser() {
	return {
		fullName: "John Doe2",
		email: "john.doe2@example.com",
		password: "Test12345!",
	};
}

export function existingUserMixedCase() {
	return {
		fullName: "John Doe2",
		email: "John.Doe2@Example.com",
		password: "Test12345!",
	};
}

export function existingUserWrongPassword() {
	return {
		fullName: "John Doe2",
		email: "john.doe2@example.com",
		password: "WrongPassword123!",
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

export function generateShippingDetails() {
	return {
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		email: faker.internet.email(),
		phone: faker.phone.number(),
		address: faker.location.streetAddress(),
		city: faker.location.city(),
		postalCode: faker.location.zipCode(),
	};
}

export function generatePaymentDetails() {
	return {
		cardNumber: faker.finance.creditCardNumber(),
		cardName: faker.person.fullName(),
		expiry: "12/29",
		cvv: faker.finance.creditCardCVV(),
	};
}
export function generateContactDetails(): ContactDetails {
	return {
		name: faker.person.fullName(),
		email: faker.internet.email(),
		subject: faker.lorem.sentence(4),
		message: faker.lorem.paragraph(),
	};
}
