export function getTodayInFrench(): string {
	return new Date().toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}

export function normalizeOrderNumber(checkoutOrderNumber: string): string {
	// "#TH-9B88AC19" -> "9b88ac19"
	return checkoutOrderNumber.replace(/^#TH-/i, "").toLowerCase();
}
