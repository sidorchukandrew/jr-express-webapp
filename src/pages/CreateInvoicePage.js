import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";
import ArrowNarrowLeftIcon from "@heroicons/react/outline/ArrowNarrowLeftIcon";
import ArrowNarrowRightIcon from "@heroicons/react/outline/ArrowNarrowRightIcon";

import InvoiceFormFields from "../components/InvoiceFormFields";
import InvoiceFormImages from "../components/InvoiceFormImages";
import FormProgress from "../components/FormProgress";
import InvoiceFormReview from "../components/InvoiceFormReview";
import InvoiceFormGenerating from "../components/InvoiceFormGenerating";
import InvoicesApi from "../api/InvoicesApi";

export default function CreateInvoicePage() {
	const [formStep, setFormStep] = useState(0);
	const [form, setForm] = useState({});
	const [loadingNextNumber, setLoadingNextNumber] = useState(false);
	const router = useHistory();

	useEffect(() => {
		async function fetchNextInvoiceNumber() {
			setLoadingNextNumber(true);
			try {
				let { data } = await InvoicesApi.getNextNumber();
				setForm((f) => ({ ...f, invoice_number: data.number }));
			} catch (error) {
				console.log(error);
			} finally {
				setLoadingNextNumber(false);
			}
		}

		fetchNextInvoiceNumber();
	}, []);

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
						loadingNextNumber={loadingNextNumber}
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
			case 3:
				return <InvoiceFormGenerating form={form} />;

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

	const handleIncrementFormStep = async () => {
		setFormStep((currentStep) => currentStep + 1);
	};

	return (
		<div>
			<div className="flex">
				<div className="lg:ml-44 w-full">
					{getFormStep()}
					{formStep < 3 && (
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
							<Button color="purple" onClick={handleIncrementFormStep}>
								<div className="flex-center">
									{NEXT_BUTTON_NAMES[formStep]}
									<ArrowNarrowRightIcon style={{ height: "18px" }} className="ml-5" />
								</div>
							</Button>
						</div>
					)}
				</div>
				{formStep < 3 && (
					<FormProgress currentStep={formStep} onStepClick={(newStep) => setFormStep(newStep)} />
				)}
			</div>
		</div>
	);
}

const NEXT_BUTTON_NAMES = ["Images", "Review", "Generate"];
