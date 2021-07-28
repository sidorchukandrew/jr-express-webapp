export default function Title({ children, button }) {
	return (
		<h1 className="border-b pb-2 mb-8 flex-between">
			{children} {button}
		</h1>
	);
}
