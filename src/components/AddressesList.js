import Address from "./Address";

export default function AddressesList({ addresses, onDeleted, onEditClicked }) {
	return (
		<div className="grid sm:grid-cols-3 grid-cols-1 gap-5 ">
			{addresses?.map((address) => (
				<Address
					key={address.id}
					address={address}
					onDeleted={onDeleted}
					onEditClicked={onEditClicked}
				/>
			))}
		</div>
	);
}
