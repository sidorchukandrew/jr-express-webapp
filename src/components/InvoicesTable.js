import { useHistory } from "react-router-dom";
import { Table } from "semantic-ui-react";
import { toShortDate } from "../utils/DateUtils";
import { calculateTotal } from "../utils/FinancialUtils";

export default function InvoicesTable({ invoices }) {
	const router = useHistory();

	return (
		<div>
			<Table celled striped selectable>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Invoice Number</Table.HeaderCell>
						<Table.HeaderCell>Billed To</Table.HeaderCell>
						<Table.HeaderCell>Total</Table.HeaderCell>
						<Table.HeaderCell>Created On</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{invoices.map((invoice) => (
						<Table.Row key={invoice.id} onClick={() => router.push(`/invoices/${invoice.id}`)}>
							<Table.Cell>{invoice.invoice_number}</Table.Cell>
							<Table.Cell>{invoice.bill_to_company}</Table.Cell>
							<Table.Cell>${calculateTotal(invoice)}</Table.Cell>
							<Table.Cell>{toShortDate(invoice.created_at)}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
	);
}
