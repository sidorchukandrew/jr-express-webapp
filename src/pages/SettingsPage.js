import { useEffect, useState } from "react";
import { Button, Form, Input, TextArea } from "semantic-ui-react";

import SettingsApi from "../api/SettingsApi";
import FormLabel from "../components/FormLabel";
import Subtitle from "../components/Subtitle";
import Title from "../components/Title";

export default function SettingsPage() {
	const [emailSettings, setEmailSettings] = useState({});
	const [savingEmailSettings, setSavingEmailSettings] = useState(false);

	useEffect(() => {
		async function fetchEmailSettings() {
			try {
				let { data } = await SettingsApi.getEmailSettings();
				setEmailSettings(data);
			} catch (error) {
				console.log(error);
			}
		}

		fetchEmailSettings();
	}, []);

	const handleDefaultBodyChange = (newDefaultBody) => {
		setEmailSettings((currentSettings) => ({ ...currentSettings, default_body: newDefaultBody }));
	};

	const handleDefaultSubjectChange = (newDefaultSubject) => {
		setEmailSettings((currentSettings) => ({
			...currentSettings,
			default_subject: newDefaultSubject,
		}));
	};

	const handleSaveEmailSettings = () => {
		setSavingEmailSettings(true);

		if ("id" in emailSettings) {
			handleUpdateEmailSettings();
		} else {
			handleCreateEmailSettings();
		}
	};

	const handleCreateEmailSettings = async () => {
		try {
			let { data } = await SettingsApi.createEmailSettings(emailSettings);
			setEmailSettings(data);
		} catch (error) {
			console.log(error);
		} finally {
			setSavingEmailSettings(false);
		}
	};
	const handleUpdateEmailSettings = async () => {
		try {
			let { data } = await SettingsApi.updateEmailSettings({
				default_subject: emailSettings.default_subject,
				default_body: emailSettings.default_body,
			});
			setEmailSettings(data);
		} catch (error) {
			console.log(error);
		} finally {
			setSavingEmailSettings(false);
		}
	};

	return (
		<div className="my-4">
			<Title>Settings</Title>
			<div className="bg-gray-100 rounded-md py-3 px-4">
				<Subtitle>Email</Subtitle>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					<FormLabel>Default Subject:</FormLabel>
					<Input
						fluid
						value={emailSettings.default_subject}
						placeholder="Enter what you would like the default subject to be"
						onChange={(e) => handleDefaultSubjectChange(e.target.value)}
						className="text-lg"
					/>
					<FormLabel>Default Body:</FormLabel>
					<Form>
						<TextArea
							fluid
							value={emailSettings.default_body}
							placeholder="Enter what you would like the default body to be"
							onChange={(e) => handleDefaultBodyChange(e.target.value)}
						/>
					</Form>
				</div>

				<div className="flex justify-end mt-3">
					<Button color="purple" onClick={handleSaveEmailSettings} loading={savingEmailSettings}>
						Save
					</Button>
				</div>
			</div>
		</div>
	);
}
