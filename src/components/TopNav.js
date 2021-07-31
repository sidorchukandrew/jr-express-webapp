import { Link, useHistory, useLocation } from "react-router-dom";
import { Menu, Segment } from "semantic-ui-react";

export default function TopNav() {
	const pathname = useLocation().pathname;
	const router = useHistory();

	const handleLogout = () => {
		localStorage.removeItem("name");
		localStorage.removeItem("password");

		router.push("/login");
	};

	return (
		<nav>
			<Segment inverted>
				<Menu inverted secondary pointing>
					<div className="flex-between w-full">
						<div className="flex">
							<Link to="/">
								<Menu.Item active={pathname === "/"}>Home</Menu.Item>
							</Link>
							<Link to="/invoices">
								<Menu.Item active={pathname.includes("/invoices")}>Invoices</Menu.Item>
							</Link>
							<Link to="/addresses">
								<Menu.Item active={pathname.includes("/addresses")}>Addresses</Menu.Item>
							</Link>
							<Link to="/settings">
								<Menu.Item active={pathname.includes("/settings")}>Settings</Menu.Item>
							</Link>
						</div>

						<Menu.Item onClick={handleLogout}>Log Out</Menu.Item>
					</div>
				</Menu>
			</Segment>
		</nav>
	);
}
