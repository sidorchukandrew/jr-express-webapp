import TrashIcon from "@heroicons/react/outline/TrashIcon";
import PencilIcon from "@heroicons/react/outline/PencilIcon";
import { useState } from "react";
import { Loader } from "semantic-ui-react";

import AddressesApi from "../api/AddressesApi";

export default function Address({ address, onDeleted, onEditClicked }) {
	const [deleting, setDeleting] = useState(false);

	const handleDelete = async () => {
		setDeleting(true);
		try {
			await AddressesApi.deleteOne(address.id);
			onDeleted(address.id);
		} catch (error) {
			console.log(error);
		} finally {
			setDeleting(false);
		}
	};

	return (
		<div
			className={
				`text-gray-700 border-2 border-gray-300 bg-white ` +
				` rounded-md text-base outline-none focus:outline-none text-left ` +
				`  flex-shrink-0 flex-between`
			}
		>
			<div className="py-2 px-3">
				<div className="font-semibold">{address.company}</div>
				<div>{address.street}</div>
				<div>
					{address.city} {address.state}, {address.zip}
				</div>
			</div>
			<div className="flex h-full">
				<button
					onClick={() => onEditClicked(address)}
					className="border-r border-gray-300 px-4 bg-gray-100 h-full flex-grow transition-colors hover:bg-gray-200 focus:bg-gray-200"
				>
					<PencilIcon className="w-4 h-4" />
				</button>
				<button
					onClick={handleDelete}
					className="px-4 bg-gray-100 h-full rounded-r-sm transition-colors flex-grow hover:bg-gray-200 focus:bg-gray-200"
					disabled={deleting}
				>
					{deleting ? (
						<Loader size="mini" active inline />
					) : (
						<TrashIcon className="w-4 h-4 text-red-600" />
					)}
				</button>
			</div>
		</div>
	);
}
