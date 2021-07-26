export default function AddressSuggestion({ address, onClick, active }) {
	return (
		<button
			className={
				`text-gray-700 border-2 border-gray-300 bg-white ` +
				` rounded-md px-3 py-2 text-base outline-none focus:outline-none text-left ` +
				` hover:border-purple-600 transition-colors flex-shrink-0` +
				` ${active ? " border-purple-600 " : ""}`
			}
			onClick={() => onClick(address)}
		>
			<div className="font-semibold">{address.company}</div>
			<div>{address.street}</div>
			<div>
				{address.city} {address.state}, {address.zip}
			</div>
		</button>
	);
}
