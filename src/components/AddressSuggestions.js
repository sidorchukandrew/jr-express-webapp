import { useState } from "react";
import AddressSuggestion from "./AddressSuggestion";

export default function AddressSuggestions({ query, onAddressClicked, suggestions }) {
	const [selectedAddress, setSelectedAddress] = useState({});
	const handleAddressClicked = (address) => {
		setSelectedAddress(address);
		onAddressClicked(address);
	};

	const filterAddressesByCompany = () => {
		return suggestions.filter((address) => {
			if (query) {
				let company = address.company?.toLowerCase();
				let lowerCaseQuery = query.toLowerCase();

				return company.includes(lowerCaseQuery);
			} else {
				return true;
			}
		});
	};

	let addresses = filterAddressesByCompany().map((address, index) => (
		<AddressSuggestion
			key={index}
			address={address}
			onClick={handleAddressClicked}
			active={address.company === selectedAddress.company}
		/>
	));

	return (
		<div
			className={`rounded-md bg-gray-50 border p-2 mb-2 flex gap-3 overflow-y-auto ${
				addresses.length === 0 ? "h-32" : ""
			}`}
		>
			{addresses.length > 0 ? (
				addresses
			) : (
				<div className="w-full flex-center text-gray-400 text-base">No suggestions to show</div>
			)}
		</div>
	);
}
