import { calculateTotal } from "../utils/FinancialUtils";
import Title from "./Title";

export default function InvoiceFormReview({ form }) {
	return (
		<div className="my-4">
			<Title>Review</Title>
			<div className="font-semibold italic mb-10">
				<div className="flex-center  relative border-b-2 border-black mb-0.5">
					<div className="text-4xl">JR EXPRESS</div>
					<div className="absolute right-0 bottom-0">
						Invoice #: <span className="pl-2">{form.invoice_number}</span>
					</div>
				</div>
				<div className="border-b border-black w-full mb-4"></div>

				<div className="pl-5 pr-5">
					<div className="underline">REMIT TO:</div>
					<div className="text-center   text-lg leading-snug mb-3">
						3032 CAMERONDALE RD
						<br />
						BALDWINSVILLE, NY 13027
						<br />
						315-254-4667
					</div>

					<div className="  underline">BILL TO:</div>
					<div className="text-center text-lg leading-snug mb-3">
						{form.bill_to_company}
						<br />
						{form.bill_to_street}
						<br />
						{form.bill_to_city}, {form.bill_to_state} {form.bill_to_zip}
					</div>

					<div>
						Broker load #: <span className="pl-2">{form.broker_load_number}</span>
					</div>

					{form.reference_number && (
						<div>
							Reference #: <span className="pl-2">{form.reference_number}</span>
						</div>
					)}

					{form.pickup_number && (
						<div>
							Pickup #: <span className="pl-2">{form.pickup_number}</span>
						</div>
					)}

					<div className="pb-2 border-b-2 border-black mb-6">
						JR EXPRESS Load #: <span className="pl-2">{form.invoice_number}</span>
					</div>

					<div className="flex mb-6">
						<div className="w-1/2 flex-shrink-0">
							<div className="mb-6">Pick up from:</div>
							<div>
								{form.pickup_company} <br />
								{form.pickup_street} <br />
								{form.pickup_city}, {form.pickup_state} {form.pickup_zip}
							</div>
						</div>
						<div className="w-1/2 flex-shrink-0">
							<div className="mb-6">Deliver to:</div>
							<div>
								{form.deliver_to_company} <br />
								{form.deliver_to_street} <br />
								{form.deliver_to_city}, {form.deliver_to_state} {form.deliver_to_zip}
							</div>
						</div>
					</div>

					<div>
						<div>INVOICE SUMMARY</div>
						<table className="border w-full">
							<tbody>
								<tr>
									<td className="border px-4 w-1/2">Load pay</td>
									<td className="border px-4 text-right">{form.load_pay}</td>
								</tr>
								{"lumper" in form && (
									<tr>
										<td className="border px-4 w-1/2">Lumper</td>
										<td className="border px-4 text-right">{form.lumper}</td>
									</tr>
								)}
								<tr>
									<td className="border px-4 w-1/2 text-right">TOTAL DUE</td>
									<td className="border px-4 text-right">${calculateTotal(form)}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div className="mb-10">
				<div className="font-semibold text-2xl mb-4">Images ({form.images.length})</div>
				{form.images?.map((dataUrl, index) => (
					<img src={dataUrl} key={index} className="mb-2" alt="Invoice attachment" />
				))}
			</div>
		</div>
	);
}
