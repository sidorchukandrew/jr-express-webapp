export function toShortDate(date) {
	date = new Date(date);
	return date.toDateString();
}
