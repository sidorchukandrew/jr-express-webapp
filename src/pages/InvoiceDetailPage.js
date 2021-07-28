import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Title from "../components/Title";
import InvoicesApi from "../api/InvoicesApi";

export default function InvoiceDetailPage() {
	const [invoice, setInvoice] = useState();
	const { id } = useParams();

	useEffect(() => {
		async function fetchInvoice() {
			try {
				let { data } = await InvoicesApi.getOne(id);
				setInvoice(data);
			} catch (error) {
				console.log(error);
			}
		}

		fetchInvoice();
	}, [id]);

	if (invoice) {
		return (
			<div className="my-4">
				<Title>Invoice #{invoice.invoice_number}</Title>

				<embed src={invoice.pdf_url} width="800px" height="2100px" type="application/pdf" />
			</div>
		);
	} else {
		return <div>Invoice</div>;
	}
}
