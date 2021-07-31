import axios from "axios";
import { constructAuthHeader } from "./SettingsApi";

const ADDRESSES_URL = process.env.REACT_APP_API_URL + "/addresses";
export default class AddressesApi {
	static getAll() {
		return axios.get(ADDRESSES_URL, { headers: constructAuthHeader() });
	}

	static deleteOne(id) {
		return axios.delete(`${ADDRESSES_URL}/${id}`, { headers: constructAuthHeader() });
	}

	static create(addressParams) {
		return axios.post(ADDRESSES_URL, addressParams, { headers: constructAuthHeader() });
	}

	static updateOne(id, addressParams) {
		return axios.put(`${ADDRESSES_URL}/${id}`, addressParams, { headers: constructAuthHeader() });
	}
}
