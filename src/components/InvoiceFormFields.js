import { useState } from "react";
import { Input } from "semantic-ui-react";
import Address from "../components/Address";
import FormLabel from "../components/FormLabel";
import { calculateTotal } from "../utils/FinancialUtils";
import OptionalField from "./OptionalField";
import Title from "./Title";

export default function InvoiceFormFields({ form, onFieldChange, onRemoveField }) {
	const [showPickupNumberField, setShowPickupNumberField] = useState(() => {
		return "pickup_number" in form;
	});
	const [showReferenceNumberField, setShowReferenceNumberField] = useState(() => {
		return "reference_number" in form;
	});
	const [showLumperField, setShowLumperField] = useState(() => {
		return "lumper" in form;
	});

	const handleShowChanged = (newShowValue, fieldName, setter) => {
		if (newShowValue) {
			setter(newShowValue);
		} else {
			onRemoveField(fieldName);
			setter(newShowValue);
		}
	};

	const handleFieldChange = (e, fieldName) => {
		onFieldChange(e.target.value, fieldName);
	};

	const convertBillTo = () => {
		let baseAddress = {
			company: form.bill_to_company,
			street: form.bill_to_street,
			city: form.bill_to_city,
			state: form.bill_to_state,
			zip: form.bill_to_zip,
		};

		return baseAddress;
	};

	const convertPickupAddress = () => {
		let baseAddress = {
			company: form.pickup_company,
			street: form.pickup_street,
			city: form.pickup_city,
			state: form.pickup_state,
			zip: form.pickup_zip,
		};

		return baseAddress;
	};

	const convertDeliveryAddress = () => {
		let baseAddress = {
			company: form.deliver_to_company,
			street: form.deliver_to_street,
			city: form.deliver_to_city,
			state: form.deliver_to_state,
			zip: form.deliver_to_zip,
		};

		return baseAddress;
	};

	const calculateTotalPay = () => {
		return calculateTotal(form);
	};

	return (
		<div>
			<div className="mb-14 sm:mb-8 mt-5">
				<Title>New Invoice</Title>
				<FormLabel className="mb-3">Invoice / Load Number</FormLabel>
				<Input
					label="#"
					placeholder="Invoice number"
					fluid
					type="number"
					value={form.invoice_number ? form.invoice_number : ""}
					onChange={(e) => handleFieldChange(e, "invoice_number")}
				/>
			</div>
			<div className="mb-14 sm:mb-8">
				<Address
					label="Bill To"
					address={convertBillTo()}
					onFieldChange={(e, fieldName) => handleFieldChange(e, "bill_to_" + fieldName)}
				/>
			</div>
			<div className="mb-14 sm:mb-8">
				<FormLabel className="mb-3">Broker Load #</FormLabel>
				<Input
					fluid
					value={form?.broker_load_number ? form.broker_load_number : ""}
					onChange={(e) => handleFieldChange(e, "broker_load_number")}
					placeholder="Broker load #"
					label="#"
				/>
			</div>
			<div className="mb-14 sm:mb-8">
				<OptionalField
					label="Pickup Number"
					show={showPickupNumberField}
					onShowChange={(newShowValue) =>
						handleShowChanged(newShowValue, "pickup_number", setShowPickupNumberField)
					}
					value={form.pickup_number}
					onChange={(e) => handleFieldChange(e, "pickup_number")}
				/>
			</div>
			<div className="mb-14 sm:mb-8">
				<OptionalField
					label="Reference Number"
					show={showReferenceNumberField}
					onShowChange={(newShowValue) =>
						handleShowChanged(newShowValue, "reference_number", setShowReferenceNumberField)
					}
					value={form.reference_number}
					onChange={(e) => handleFieldChange(e, "reference_number")}
				/>
			</div>
			<div className="mb-14 sm:mb-8">
				<Address
					label="Pick Up Address"
					address={convertPickupAddress()}
					onFieldChange={(e, fieldName) => handleFieldChange(e, "pickup_" + fieldName)}
				/>
			</div>
			<div className="mb-14 sm:mb-8">
				<Address
					label="Delivery Address"
					address={convertDeliveryAddress()}
					onFieldChange={(e, fieldName) => handleFieldChange(e, "deliver_to_" + fieldName)}
				/>
			</div>
			<div className="mb-14 sm:mb-8">
				<FormLabel className="mb-3">Load Pay</FormLabel>
				<Input
					label="$"
					fluid
					type="number"
					value={form?.load_pay ? form.load_pay : ""}
					onChange={(e) => handleFieldChange(e, "load_pay")}
					placeholder="Load pay"
				/>
			</div>
			<div className="mb-14 sm:mb-8">
				<OptionalField
					label="Lumper"
					show={showLumperField}
					onShowChange={(newShowValue) =>
						handleShowChanged(newShowValue, "lumper", setShowLumperField)
					}
					value={form.lumper}
					onChange={(e) => handleFieldChange(e, "lumper")}
					inputLabel="$"
					type="number"
				/>
			</div>
			<div className="mb-14 sm:mb-8">
				<h1 className="text-right">
					Total: <span className="ml-2">${calculateTotalPay()}</span>
				</h1>
			</div>
		</div>
	);
}
