import { useEffect, useState } from "react";
import { Button, Loader } from "semantic-ui-react";
import InvoicesApi from "../api/InvoicesApi";
import DocumentTextIcon from "@heroicons/react/solid/DocumentTextIcon";
import { useHistory } from "react-router-dom";

export default function InvoiceFormGenerating({ form }) {
	const [loading, setLoading] = useState(true);
	const [invoice, setInvoice] = useState();

	const router = useHistory();

	useEffect(() => {
		async function saveInvoice() {
			try {
				setLoading(true);
				let { data } = await InvoicesApi.create(form);
				setInvoice(data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
		if (form) {
			saveInvoice();
		}
	}, [form]);

	if (loading) {
		return (
			<div className="mx-auto">
				<Loader active size="massive">
					Your PDF is being prepared
				</Loader>
			</div>
		);
	} else {
		return (
			<div className="mx-auto my-10">
				<a href={invoice.pdf_url} download={`Invoice_${invoice.invoice_number}.pdf`}>
					<Button fluid color="purple">
						<div className="flex-center">
							<DocumentTextIcon style={{ width: "15px" }} className="mr-3" /> Download PDF
						</div>
					</Button>
				</a>
				<div className="flex gap-4 mt-4">
					<Button basic fluid onClick={() => router.push(`/invoices/${invoice.id}`)}>
						View Details
					</Button>
				</div>
			</div>
		);
	}
}
