import { Input, Radio } from "semantic-ui-react";

import FormLabel from "./FormLabel";

export default function OptionalField({
	show,
	label,
	onShowChange,
	value,
	onChange,
	inputLabel,
	type,
}) {
	let field = null;
	if (show) {
		field = (
			<Input
				placeholder={label}
				fluid
				value={value ? value : ""}
				onChange={onChange}
				label={inputLabel}
				type={type}
			/>
		);
	}
	return (
		<div>
			<div className="flex items-center mb-3">
				<FormLabel className="mr-3">{label}</FormLabel>
				<Radio toggle checked={show} onChange={(e, value) => onShowChange(value.checked)} />
			</div>
			{field}
		</div>
	);
}
