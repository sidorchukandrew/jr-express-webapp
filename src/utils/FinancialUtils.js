export function calculateTotal(form) {
  let lumper = 'lumper' in form ? Number.parseFloat(form.lumper) : 0;
  let loadPay = 'load_pay' in form ? Number.parseFloat(form.load_pay) : 0;

  let total = lumper + loadPay;

  return total.toFixed(2);
}

export function calculateGrandTotal(invoices = []) {
  let grandTotal = 0;

  invoices.forEach(invoice => {
    if ('lumper' in invoice) {
      grandTotal += Number.parseFloat(invoice.lumper);
    }

    if ('load_pay' in invoice) {
      grandTotal += Number.parseFloat(invoice.load_pay);
    }
  });

  return grandTotal.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}
