import { useHistory } from 'react-router-dom';
import { Checkbox, Table } from 'semantic-ui-react';
import { toShortDate } from '../utils/DateUtils';
import { calculateGrandTotal, calculateTotal } from '../utils/FinancialUtils';

export default function InvoicesTable({ invoices, onPaidToggled }) {
  const router = useHistory();

  return (
    <div>
      <Table celled striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Paid</Table.HeaderCell>
            <Table.HeaderCell>Invoice Number</Table.HeaderCell>
            <Table.HeaderCell>Billed To</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Created On</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {invoices.map(invoice => (
            <Table.Row key={invoice.id}>
              <Table.Cell textAlign="center">
                <Checkbox
                  checked={invoice.is_paid}
                  onChange={() => onPaidToggled(invoice.id)}
                />
              </Table.Cell>
              <Table.Cell
                onClick={() => router.push(`/invoices/${invoice.id}`)}
              >
                {invoice.invoice_number}
              </Table.Cell>
              <Table.Cell
                onClick={() => router.push(`/invoices/${invoice.id}`)}
              >
                {invoice.bill_to_company}
              </Table.Cell>
              <Table.Cell
                onClick={() => router.push(`/invoices/${invoice.id}`)}
              >
                ${calculateTotal(invoice)}
              </Table.Cell>
              <Table.Cell
                onClick={() => router.push(`/invoices/${invoice.id}`)}
              >
                {toShortDate(invoice.created_at)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>{calculateGrandTotal(invoices)}</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
}
