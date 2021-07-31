import axios from "axios";

import { constructAuthHeader } from "./SettingsApi";
const INVOICES_URL = process.env.REACT_APP_API_URL + "/invoices";
export const BASE_URL = process.env.REACT_APP_API_URL;

export default class InvoicesApi {
	static create(invoiceParams) {
		let formData = new FormData();

		for (let key of Object.keys(invoiceParams)) {
			if (key === "images") {
				let imageFiles = invoiceParams["images"].map((image) => image.file);
				imageFiles.forEach((file) => {
					formData.append(`images[]`, file);
				});
			} else {
				formData.append(key, invoiceParams[key]);
			}
		}

		return axios.post(INVOICES_URL, formData, {
			headers: constructAuthHeader(),
		});
	}

	static getAll() {
		return axios.get(INVOICES_URL, { headers: constructAuthHeader() });
	}

	static getOne(id) {
		return axios.get(`${INVOICES_URL}/${id}`, { headers: constructAuthHeader() });
	}

	static getNextNumber() {
		return axios.get(`${BASE_URL}/invoice_numbers`, { headers: constructAuthHeader() });
	}

	static emailInvoice(id, email) {
		return axios.post(`${INVOICES_URL}/${id}/email`, email, { headers: constructAuthHeader() });
	}
}
