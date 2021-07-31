import axios from "axios";

import { BASE_URL } from "./InvoicesApi";
import { constructAuthHeader } from "./SettingsApi";
const CONTACTS_URL = BASE_URL + "/contacts";

export default class ContactsApi {
	static getAll() {
		return axios.get(CONTACTS_URL, { headers: constructAuthHeader() });
	}
}
