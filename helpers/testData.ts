import { faker } from "@faker-js/faker";

export function generateCheckoutData() {
	return {
		nom: faker.person.fullName(),
		adresse: faker.location.streetAddress(),
		ville: faker.location.city(),
		codepostal: faker.location.zipCode(),
	};
}
