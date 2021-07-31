import axios from "axios";
import { BASE_URL } from "./InvoicesApi";

export default class SettingsApi {
	static getEmailSettings() {
		return axios.get(BASE_URL + "/email_settings", {
			headers: constructAuthHeader(),
		});
	}

	static createEmailSettings(emailSettings) {
		return axios.post(BASE_URL + "/email_settings", emailSettings, {
			headers: constructAuthHeader(),
		});
	}

	static updateEmailSettings(emailSettings) {
		return axios.put(BASE_URL + "/email_settings", emailSettings, {
			headers: constructAuthHeader(),
		});
	}
}

export function constructAuthHeader() {
	let name = localStorage.getItem("name");
	let password = localStorage.getItem("password");

	return {
		Authorization: `${name}:${password}`,
	};
}
