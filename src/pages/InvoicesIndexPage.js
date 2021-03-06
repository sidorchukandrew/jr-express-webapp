import { useEffect, useState } from "react";

import InvoicesApi from "../api/InvoicesApi";
import Title from "../components/Title";
import InvoicesTable from "../components/InvoicesTable";
import { Button, Loader } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export default function InvoicesIndexPage() {
	const [invoices, setInvoices] = useState([]);
	const [loading, setLoading] = useState(true);
	const router = useHistory();
	useEffect(() => {
		async function fetchInvoices() {
			try {
				let { data } = await InvoicesApi.getAll();
				setInvoices(data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		fetchInvoices();
	}, []);

	const handlePaidToggled = async (invoiceId) => {
		let invoiceIndex = invoices.findIndex((invoice) => invoice.id === invoiceId);
		let invoicesCopy = [...invoices];

		invoicesCopy[invoiceIndex].is_paid = !invoicesCopy[invoiceIndex].is_paid;
		try {
			setInvoices(invoicesCopy);
			await InvoicesApi.updateOne(invoiceId, {
				is_paid: invoices[invoiceIndex].is_paid,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="my-4">
			<Title
				button={
					<Button color="purple" onClick={() => router.push("/invoices/new")}>
						Create New Invoice
					</Button>
				}
			>
				Invoices
			</Title>
			<InvoicesTable invoices={invoices} onPaidToggled={handlePaidToggled} />
			<Loader size="medium" active={loading} />
		</div>
	);
}
