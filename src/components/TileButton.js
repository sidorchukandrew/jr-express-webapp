export default function TileButton({ children, onClick, active, className }) {
	return (
		<button
			onClick={onClick}
			className={
				`rounded-md shadow-sm border-2 hover:border-purple-500 focus:border-purple-500 transition-all py-3` +
				` ${active ? " border-purple-500" : ""} ` +
				` ${className}`
			}
		>
			{children}
		</button>
	);
}
