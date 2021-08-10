export function toShortDate(date) {
	date = new Date(date);
	return date.toDateString();
}

export function toFullDate(date) {
	date = new Date(date);
	return `${date.toDateString()} ${date.getHours() % 12}:${date.getMinutes()} ${
		date.getHours() > 12 ? "PM" : "AM"
	}`;
}
