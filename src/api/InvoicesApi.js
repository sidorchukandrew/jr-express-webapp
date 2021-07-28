import axios from "axios";

const INVOICES_URL = process.env.REACT_APP_API_URL + "/invoices";
const BASE_URL = process.env.REACT_APP_API_URL;
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

		return axios.post(INVOICES_URL, formData);
	}

	static getAll() {
		return axios.get(INVOICES_URL);
	}

	static getOne(id) {
		return axios.get(`${INVOICES_URL}/${id}`);
	}

	static getNextNumber() {
		return axios.get(`${BASE_URL}/invoice_numbers`);
	}
}
