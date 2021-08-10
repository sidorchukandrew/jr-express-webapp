import { Table } from "semantic-ui-react";
import { toFullDate } from "../utils/DateUtils";

export default function EmailsTable({ emails }) {
	return (
		<Table celled striped>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Sent On</Table.HeaderCell>
					<Table.HeaderCell>Recipient</Table.HeaderCell>
					<Table.HeaderCell>Subject</Table.HeaderCell>
					<Table.HeaderCell>BCC</Table.HeaderCell>
					<Table.HeaderCell>Body</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{emails?.map((email) => (
					<Table.Row key={email.id} positive={email.justAdded}>
						<Table.Cell>{toFullDate(email.created_at)}</Table.Cell>
						<Table.Cell>{email.recipient}</Table.Cell>
						<Table.Cell>{email.subject}</Table.Cell>
						<Table.Cell>{email.bcc}</Table.Cell>
						<Table.Cell>{email.body}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}
