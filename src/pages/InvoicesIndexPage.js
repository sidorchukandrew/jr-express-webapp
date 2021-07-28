import { useEffect, useState } from "react";

import InvoicesApi from "../api/InvoicesApi";
import Title from "../components/Title";
import InvoicesTable from "../components/InvoicesTable";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export default function InvoicesIndexPage() {
	const [invoices, setInvoices] = useState([]);
	const router = useHistory();
	useEffect(() => {
		async function fetchInvoices() {
			try {
				let { data } = await InvoicesApi.getAll();
				setInvoices(data);
			} catch (error) {
				console.log(error);
			}
		}

		fetchInvoices();
	}, []);
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
			<InvoicesTable invoices={invoices} />
		</div>
	);
}
