export function calculateTotal(form) {
	let lumper = "lumper" in form ? Number.parseFloat(form.lumper) : 0;
	let loadPay = "load_pay" in form ? Number.parseFloat(form.load_pay) : 0;

	let total = lumper + loadPay;

	return total.toFixed(2);
}
