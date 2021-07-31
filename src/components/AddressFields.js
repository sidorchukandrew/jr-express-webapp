import { Grid, Input } from "semantic-ui-react";
import FormLabel from "./FormLabel";
import AddressSuggestions from "./AddressSuggestions";
import { useState } from "react";

export default function Address({ label, onFieldChange, address, addressSuggestions, loading }) {
	const [query, setQuery] = useState("");

	const handleCompanyChange = (e) => {
		onFieldChange(e, "company");
		setQuery(e.target.value);
	};

	const handleAddressClicked = (address) => {
		onFieldChange(toEvent(address.company), "company");
		onFieldChange(toEvent(address.street), "street");
		onFieldChange(toEvent(address.state), "state");
		onFieldChange(toEvent(address.city), "city");
		onFieldChange(toEvent(address.zip), "zip");
	};

	const toEvent = (value) => {
		return {
			target: {
				value: value,
			},
		};
	};

	return (
		<div>
			<FormLabel className="mb-3">{label}</FormLabel>
			<AddressSuggestions
				query={query}
				onAddressClicked={handleAddressClicked}
				suggestions={addressSuggestions}
				loading={loading}
			/>
			<div className="mt-4 mb-2">
				<Input
					fluid
					placeholder="Company"
					value={address?.company ? address.company : ""}
					onChange={handleCompanyChange}
				/>
			</div>
			<div className="mb-2">
				<Input
					fluid
					placeholder="Street"
					value={address?.street ? address.street : ""}
					onChange={(e) => onFieldChange(e, "street")}
				/>
			</div>

			<div className="mb-2">
				<Grid columns={3}>
					<Grid.Column>
						<Input
							fluid
							placeholder="City"
							value={address?.city ? address.city : ""}
							onChange={(e) => onFieldChange(e, "city")}
						/>
					</Grid.Column>
					<Grid.Column>
						<Input
							fluid
							placeholder="State"
							value={address?.state ? address.state : ""}
							onChange={(e) => onFieldChange(e, "state")}
						/>
					</Grid.Column>
					<Grid.Column>
						<Input
							fluid
							placeholder="Zip"
							onChange={(e) => onFieldChange(e, "zip")}
							value={address?.zip ? address.zip : ""}
						/>
					</Grid.Column>
				</Grid>
			</div>
		</div>
	);
}
