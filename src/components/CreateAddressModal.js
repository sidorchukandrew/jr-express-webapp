import { useState } from "react";
import { Input, Modal, Grid, Button } from "semantic-ui-react";

import TileButton from "./TileButton";
import FormLabel from "./FormLabel";
import AddressesApi from "../api/AddressesApi";

export default function CreateAddressModal({ open, onClose, onAddressAdded }) {
	const [company, setCompany] = useState("");
	const [street, setStreet] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zip, setZip] = useState("");
	const [addressType, setAddressType] = useState("");
	const [adding, setAdding] = useState(false);

	const handleClose = () => {
		setCompany("");
		setStreet("");
		setCity("");
		setState("");
		setZip("");
		setAddressType("");
		setAdding(false);
		onClose();
	};

	const handleAdd = async () => {
		setAdding(true);
		try {
			let address = {
				company,
				city,
				street,
				zip,
				state,
				address_type: addressType,
			};
			let { data } = await AddressesApi.create(address);
			onAddressAdded(data);
			handleClose();
		} catch (error) {
			setAdding(false);
			console.log(error);
		}
	};

	return (
		<Modal open={open} onClose={handleClose} size="small">
			<Modal.Header>Add an address</Modal.Header>
			<Modal.Content>
				<div className="mb-6">
					<FormLabel className="mb-4">Address Type</FormLabel>
					<div className="flex-between gap-4">
						<TileButton
							active={addressType === "bill_to"}
							onClick={() => setAddressType("bill_to")}
							className="w-1/3"
						>
							Bill To
						</TileButton>
						<TileButton
							active={addressType === "pickup"}
							onClick={() => setAddressType("pickup")}
							className="w-1/3"
						>
							Pick Up
						</TileButton>
						<TileButton
							active={addressType === "deliver_to"}
							onClick={() => setAddressType("deliver_to")}
							className="w-1/3"
						>
							Deliver To
						</TileButton>
					</div>
				</div>
				<FormLabel className="mb-4">Fields</FormLabel>
				<div className="mb-2">
					<Input
						fluid
						placeholder="Company"
						value={company}
						onChange={(e) => setCompany(e.target.value)}
					/>
				</div>

				<div className="mb-2">
					<Input
						fluid
						placeholder="Street"
						value={street}
						onChange={(e) => setStreet(e.target.value)}
					/>
				</div>

				<div className="mb-2">
					<Grid columns={3}>
						<Grid.Column>
							<Input
								fluid
								placeholder="City"
								value={city}
								onChange={(e) => setCity(e.target.value)}
							/>
						</Grid.Column>
						<Grid.Column>
							<Input
								fluid
								placeholder="State"
								value={state}
								onChange={(e) => setState(e.target.value)}
							/>
						</Grid.Column>
						<Grid.Column>
							<Input fluid placeholder="Zip" value={zip} onChange={(e) => setZip(e.target.value)} />
						</Grid.Column>
					</Grid>
				</div>
			</Modal.Content>
			<Modal.Actions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button positive loading={adding} onClick={handleAdd}>
					Add
				</Button>
			</Modal.Actions>
		</Modal>
	);
}
