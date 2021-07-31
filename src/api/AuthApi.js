import axios from "axios";

import { BASE_URL } from "./InvoicesApi";

export default class AuthApi {
	static login(name, password) {
		return axios.post(BASE_URL + "/login", { name, password });
	}
}
