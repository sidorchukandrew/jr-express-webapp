import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import "./App.css";
import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import SecuredRoutes from "./pages/SecuredRoutes";

function App() {
	useEffect(() => {
		document.title = "JR Express";
	}, []);

	return (
		<>
			<Router>
				<Switch>
					<Route path="/login">
						<LoginPage />
					</Route>
					<SecuredRoutes />
				</Switch>
			</Router>
		</>
	);
}

export default App;
