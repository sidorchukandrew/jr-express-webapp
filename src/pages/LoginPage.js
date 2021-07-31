import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Input, Message } from "semantic-ui-react";
import AuthApi from "../api/AuthApi";

import FormLabel from "../components/FormLabel";

export default function LoginPage() {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [loggingIn, setLoggingIn] = useState(false);
	const [error, setError] = useState();
	const router = useHistory();

	const handleLogin = async () => {
		setLoggingIn(true);

		try {
			await AuthApi.login(name, password);
			localStorage.setItem("name", name);
			localStorage.setItem("password", password);

			router.push("/");
		} catch (error) {
			setLoggingIn(false);
			setError("Name or password is incorrect");
			console.log(error);
		}
	};

	return (
		<div className="max-w-3xl mx-auto py-4 px-2">
			<h1 className="text-center font-bold text-3xl mb-2">Login</h1>
			<div className="mb-4">
				<FormLabel className="mb-2">Name</FormLabel>
				<Input placeholder="Name" fluid value={name} onChange={(e) => setName(e.target.value)} />
			</div>
			<div className="mb-4">
				<FormLabel>Password</FormLabel>
				<Input
					placeholder="Password"
					type="password"
					fluid
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			{error && (
				<div className="mb-4">
					<Message negative>{error}</Message>
				</div>
			)}

			<Button
				fluid
				color="purple"
				disabled={Boolean(!name || !password)}
				loading={loggingIn}
				onClick={handleLogin}
			>
				Login
			</Button>
		</div>
	);
}
