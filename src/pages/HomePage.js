import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

export default function HomePage() {
	return (
		<div>
			Home
			<Link to="/invoices/new">
				<Button fluid color="purple">
					New Invoice
				</Button>
			</Link>
		</div>
	);
}
