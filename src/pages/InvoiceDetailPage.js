import { Button, Loader } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import ContactsApi from "../api/ContactsApi";
import DocumentTextIcon from "@heroicons/react/solid/DocumentTextIcon";
import EmailInvoiceModal from "../components/EmailInvoiceModal";
import EmailsTable from "../components/EmailsTable";
import InvoicesApi from "../api/InvoicesApi";
import PaidBadge from "../components/PaidBadge";
import PaperAirplaneIcon from "@heroicons/react/outline/PaperAirplaneIcon";
import SettingsApi from "../api/SettingsApi";
import Subtitle from "../components/Subtitle";
import Title from "../components/Title";

export default function InvoiceDetailPage() {
	const [invoice, setInvoice] = useState(null);
	const [emailSettings, setEmailSettings] = useState({});
	const [contacts, setContacts] = useState([]);
	const router = useHistory();
	const [actionButtons] = useState(
		<div>
			<span className="mr-4">
				<Button onClick={() => router.push("/invoices/new")}>New invoice</Button>
			</span>
			<Button onClick={() => setEmailModalOpen(true)}>
				<div className="flex gap-2 flex-grow-0">
					<PaperAirplaneIcon className="w-4 h-4 flex-grow-0" /> Email
				</div>
			</Button>
		</div>
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

		async function fetchContacts() {
			try {
				let { data } = await ContactsApi.getAll();
				setContacts(data);
			} catch (error) {
				console.log(error);
			}
		}

		fetchInvoice();
		fetchEmailSettings();
		fetchContacts();
	}, [id]);

	const handleEmailed = (emailJustSent) => {
		setInvoice((currentInvoice) => {
			let updatedEmails = currentInvoice.emails.map((email) => {
				delete email.justAdded;
				return email;
			});

			return {
				...currentInvoice,
				emails: [...updatedEmails, { ...emailJustSent, justAdded: true }],
			};
		});
	};

	if (invoice) {
		return (
			<div className="my-4">
				<Title button={actionButtons}>
					<span className="flex-center gap-3">
						Invoice #{invoice.invoice_number} {invoice.is_paid && <PaidBadge />}
					</span>
				</Title>

				<embed src={invoice.pdf_url} width="100%" height="1200px" type="application/pdf" />
				<div className="my-4">
					<a href={invoice.pdf_url} download={`Invoice_${invoice.invoice_number}.pdf`}>
						<Button fluid color="purple">
							<div className="flex-center">
								<DocumentTextIcon style={{ width: "15px" }} className="mr-3" /> Download PDF
							</div>
						</Button>
					</a>
				</div>

				<Subtitle>Email Log</Subtitle>
				<EmailsTable emails={invoice.emails} />
				<EmailInvoiceModal
					open={emailModalOpen}
					onClose={() => setEmailModalOpen(false)}
					invoice={invoice}
					emailSettings={emailSettings}
					contacts={contacts}
					onEmail={handleEmailed}
				/>
			</div>
		);
	} else {
		return <Loader active />;
	}
}
