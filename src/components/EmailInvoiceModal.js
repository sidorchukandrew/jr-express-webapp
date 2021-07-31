import { Button, Dropdown, Form, Input, Modal, TextArea } from "semantic-ui-react";
import PaperAirplaneIcon from "@heroicons/react/solid/PaperAirplaneIcon";

import FormLabel from "./FormLabel";
import { useEffect, useState } from "react";
import InvoicesApi from "../api/InvoicesApi";

export default function EmailInvoiceModal({ open, onClose, invoice, emailSettings, contacts }) {
	const [subject, setSubject] = useState("");
	const [body, setBody] = useState("");
	const [recipient, setRecipient] = useState("");
	const [emailing, setEmailing] = useState(false);
	const [contactOptions, setContactOptions] = useState(() => {
		if (contacts) {
			return contacts.map((contact, index) => ({
				text: contact.email,
				value: contact.email,
				key: index,
			}));
		} else {
			return [];
		}
	});

	useEffect(() => {
		if (emailSettings && open) {
			setBody(emailSettings.default_body);
			setSubject(emailSettings.default_subject);
			setEmailing(false);
		}
	}, [emailSettings, open]);

	useEffect(() => {
		setContactOptions(
			contacts.map((contact, index) => ({
				text: contact.email,
				value: contact.email,
				key: index,
			}))
		);
	}, [contacts]);

	const handleClose = () => {
		setSubject("");
		setBody("");
		setRecipient("");
		setEmailing(false);
		onClose();
	};

	const handleSend = async () => {
		setEmailing(true);
		try {
			let email = {
				subject,
				body,
				recipient,
			};
			await InvoicesApi.emailInvoice(invoice.id, email);
		} catch (error) {
			console.log(error);
		}
		handleClose();
	};

	return (
		<Modal open={open} onClose={handleClose} size="small">
			<Modal.Header>Email</Modal.Header>
			<Modal.Content>
				<div className="mb-4">
					<FormLabel className="mb-2">Recipient</FormLabel>
					<Dropdown
						fluid
						search
						placeholder="Email address"
						options={contactOptions}
						value={recipient}
						allowAdditions
						onChange={(e, { value }) => setRecipient(value)}
						onAddItem={(e, { value }) =>
							setContactOptions((currentContacts) => [
								...currentContacts,
								{ text: value, key: currentContacts.length + 1, value: value },
							])
						}
						selection
					/>
				</div>
				<div className="mb-4">
					<FormLabel className="mb-2">BCC</FormLabel>
					nikolai.ososkalo@gmail.com
				</div>
				<div className="mb-4">
					<FormLabel className="mb-2">Subject</FormLabel>
					<Input
						fluid
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						placeholder="Subject"
					/>
				</div>
				<div className="mb-4">
					<FormLabel className="mb-2">Body</FormLabel>
					<Form>
						<TextArea
							fluid
							value={body}
							onChange={(e) => setBody(e.target.value)}
							placeholder="Body"
						/>
					</Form>
				</div>

				<FormLabel className="mb-2">Attachments</FormLabel>
				<span className="border-2 rounded-md p-2">Invoice.pdf</span>
			</Modal.Content>
			<Modal.Actions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button color="purple" className="group" onClick={handleSend} loading={emailing}>
					<div className="flex">
						<PaperAirplaneIcon className="w-4 mr-2 transform group-hover:rotate-12 transition-all" />
						Send
					</div>
				</Button>
			</Modal.Actions>
		</Modal>
	);
}
