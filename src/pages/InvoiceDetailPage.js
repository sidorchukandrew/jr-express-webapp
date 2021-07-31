import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Loader } from "semantic-ui-react";
import PaperAirplaneIcon from "@heroicons/react/outline/PaperAirplaneIcon";

import Title from "../components/Title";
import InvoicesApi from "../api/InvoicesApi";
import EmailInvoiceModal from "../components/EmailInvoiceModal";
import SettingsApi from "../api/SettingsApi";

export default function InvoiceDetailPage() {
	const [invoice, setInvoice] = useState(null);
	const [emailSettings, setEmailSettings] = useState({});
	const [emailButton] = useState(
		<Button onClick={() => setEmailModalOpen(true)}>
			<div className="flex gap-2">
				<PaperAirplaneIcon className="w-4" /> Email
			</div>
		</Button>
	);

	const [emailModalOpen, setEmailModalOpen] = useState(false);
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

		async function fetchEmailSettings() {
			try {
				let { data } = await SettingsApi.getEmailSettings();
				setEmailSettings(data);
			} catch (error) {
				console.log(error);
			}
		}

		fetchInvoice();
		fetchEmailSettings();
	}, [id]);

	if (invoice) {
		return (
			<div className="my-4">
				<Title button={emailButton}>Invoice #{invoice.invoice_number}</Title>

				<embed src={invoice.pdf_url} width="100%" height="1200px" type="application/pdf" />

				<EmailInvoiceModal
					open={emailModalOpen}
					onClose={() => setEmailModalOpen(false)}
					invoice={invoice}
					emailSettings={emailSettings}
				/>
			</div>
		);
	} else {
		return <Loader active />;
	}
}
