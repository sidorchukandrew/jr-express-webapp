import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";
import ArrowNarrowLeftIcon from "@heroicons/react/outline/ArrowNarrowLeftIcon";
import ArrowNarrowRightIcon from "@heroicons/react/outline/ArrowNarrowRightIcon";

import InvoiceFormFields from "../components/InvoiceFormFields";
import InvoiceFormImages from "../components/InvoiceFormImages";
import FormProgress from "../components/FormProgress";
import InvoiceFormReview from "../components/InvoiceFormReview";

export default function CreateInvoicePage() {
	const [formStep, setFormStep] = useState(0);
	const [form, setForm] = useState({});
	const router = useHistory();

	const handleFieldChange = (value, fieldName) => {
		setForm((currentForm) => ({ ...currentForm, [fieldName]: value }));
	};

	const handleRemoveField = (fieldName) => {
		let formCopy = { ...form };
		delete formCopy[fieldName];

		setForm(formCopy);
	};

	const getFormStep = () => {
		switch (formStep) {
			case 0:
				return (
					<InvoiceFormFields
						form={form}
						onFieldChange={handleFieldChange}
						onRemoveField={handleRemoveField}
					/>
				);
			case 1:
				return (
					<InvoiceFormImages
						form={form}
						onImagesChanged={(images) => handleFieldChange(images, "images")}
					/>
				);
			case 2:
				return <InvoiceFormReview form={form} />;

			default:
				return <div>{formStep}</div>;
		}
	};

	const handleBackPressed = () => {
		if (formStep === 0) {
			console.log(formStep);
			router.push("/invoices");
		} else {
			setFormStep((currentStep) => currentStep - 1);
		}
	};

	return (
		<div>
			<div className="flex">
				<div className="lg:ml-44 w-full">
					{getFormStep()}
					<div className="mb-5 flex-between w-full">
						<Button onClick={handleBackPressed}>
							{formStep === 0 ? (
								"Cancel"
							) : (
								<div className="flex-center">
									<ArrowNarrowLeftIcon style={{ height: "18px" }} className="mr-5" /> Back
								</div>
							)}
						</Button>
						<Button color="purple" onClick={() => setFormStep((currentStep) => currentStep + 1)}>
							<div className="flex-center">
								Next <ArrowNarrowRightIcon style={{ height: "18px" }} className="ml-5" />
							</div>
						</Button>
					</div>
				</div>
				<FormProgress currentStep={formStep} onStepClick={(newStep) => setFormStep(newStep)} />
			</div>
		</div>
	);
}
