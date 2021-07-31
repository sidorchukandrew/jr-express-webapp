import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import AddressesApi from "../api/AddressesApi";

import AddressesList from "../components/AddressesList";
import CreateAddressModal from "../components/CreateAddressModal";
import EditAddressModal from "../components/EditAddressModal";
import Subtitle from "../components/Subtitle";
import Title from "../components/Title";

export default function AddressesIndexPage() {
	const [addresses, setAddresses] = useState([]);
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [addressBeingEdited, setAddressBeingEdited] = useState();

	useEffect(() => {
		async function fetchAddresses() {
			try {
				let { data } = await AddressesApi.getAll();
				setAddresses(data);
			} catch (error) {
				console.log(error);
			}
		}

		fetchAddresses();
	}, []);

	const handleAddressDeleted = async (idToDelete) => {
		setAddresses((currentAddresses) =>
			currentAddresses.filter((address) => address.id !== idToDelete)
		);
	};

	const handleAddressAdded = (newAddress) => {
		setAddresses((currentAddresses) => [...currentAddresses, newAddress]);
	};

	const handleAddressEdited = (editedAddress) => {
		let index = addresses.findIndex((address) => address.id === editedAddress.id);

		if (index > -1) {
			setAddresses((currentAddresses) => {
				currentAddresses.splice(index, 1, editedAddress);
				return currentAddresses;
			});
		}
	};

	return (
		<div className="my-5">
			<Title
				button={
					<Button color="purple" onClick={() => setCreateModalOpen(true)}>
						Add New Address
					</Button>
				}
			>
				Addresses
			</Title>

			<Subtitle>Bill To</Subtitle>
			<AddressesList
				addresses={addresses.filter((address) => address.address_type === "bill_to")}
				onDeleted={handleAddressDeleted}
				onEditClicked={(address) => setAddressBeingEdited(address)}
			/>
			<Subtitle>Pickup From</Subtitle>
			<AddressesList
				addresses={addresses.filter((address) => address.address_type === "pickup")}
				onDeleted={handleAddressDeleted}
				onEditClicked={(address) => setAddressBeingEdited(address)}
			/>

			<Subtitle>Deliver To</Subtitle>
			<AddressesList
				addresses={addresses.filter((address) => address.address_type === "deliver_to")}
				onDeleted={handleAddressDeleted}
				onEditClicked={(address) => setAddressBeingEdited(address)}
			/>
			<CreateAddressModal
				open={createModalOpen}
				onClose={() => setCreateModalOpen(false)}
				onAddressAdded={handleAddressAdded}
			/>

			<EditAddressModal
				open={Boolean(addressBeingEdited)}
				onClose={() => setAddressBeingEdited(null)}
				address={addressBeingEdited}
				onAddressEdited={handleAddressEdited}
			/>
		</div>
	);
}
