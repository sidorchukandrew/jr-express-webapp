import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import { Switch, Route, useHistory } from "react-router-dom";

import InvoiceDetailPage from "./InvoiceDetailPage";
import TopNav from "../components/TopNav";
import AddressesIndexPage from "./AddressesIndexPage";
import SettingsPage from "./SettingsPage";
import InvoicesIndexPage from "./InvoicesIndexPage";
import CreateInvoicePage from "./CreateInvoicePage";
import HomePage from "./HomePage";
import AuthApi from "../api/AuthApi";

export default function SecuredRoutes() {
	const router = useHistory();

	useEffect(() => {
		async function attemptLogin() {
			try {
				let name = localStorage.getItem("name");
				let password = localStorage.getItem("password");
				await AuthApi.login(name, password);
			} catch (error) {
				router.push("/login");
			}
		}

		attemptLogin();
	}, [router]);

	return (
		<>
			<TopNav />
			<Container>
				<div className="max-w-5xl mx-auto py-4">
					<Switch>
						<Route path="/invoices/new" exact>
							<CreateInvoicePage />
						</Route>
						<Route path="/invoices/:id" exact>
							<InvoiceDetailPage />
						</Route>
						<Route path="/invoices" exact>
							<InvoicesIndexPage />
						</Route>
						<Route path="/addresses" exact>
							<AddressesIndexPage />
						</Route>
						<Route path="/settings" exact>
							<SettingsPage />
						</Route>
						<Route path="/">
							<HomePage />
						</Route>
					</Switch>
				</div>
			</Container>
		</>
	);
}
