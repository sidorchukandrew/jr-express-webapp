import { Container } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import "./App.css";
import InvoicesIndexPage from "./pages/InvoicesIndexPage";
import CreateInvoicePage from "./pages/CreateInvoicePage";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";

function App() {
	useEffect(() => {
		document.title = "JR Express";
	}, []);

	return (
		<div className="max-w-4xl mx-auto">
			<Container>
				<Router>
					<Switch>
						<Route path="/invoices/new" exact>
							<CreateInvoicePage />
						</Route>
						<Route path="/invoices" exact>
							<InvoicesIndexPage />
						</Route>
						<Route path="/">
							<HomePage />
						</Route>
					</Switch>
				</Router>
			</Container>
		</div>
	);
}

export default App;
