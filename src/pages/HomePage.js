import { useHistory } from "react-router-dom";
import CurrencyDollarIcon from "@heroicons/react/outline/CurrencyDollarIcon";
import OfficeBuildingIcon from "@heroicons/react/outline/OfficeBuildingIcon";
import CogIcon from "@heroicons/react/outline/CogIcon";

import IconCircle from "../components/IconCircle";
import TileButton from "../components/TileButton";

export default function HomePage() {
	const router = useHistory();

	return (
		<div className="my-8">
			<h1>Welcome back</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
				<TileButton onClick={() => router.push("/invoices")}>
					<div className="flex-col flex-center gap-2 font-semibold">
						<IconCircle>
							<CurrencyDollarIcon className="text-purple-800 h-10" />
						</IconCircle>
						Invoices
					</div>
				</TileButton>
				<TileButton onClick={() => router.push("/addresses")}>
					<div className="flex-col flex-center gap-2 font-semibold">
						<IconCircle>
							<OfficeBuildingIcon className="text-purple-800 h-10" />
						</IconCircle>
						Addresses
					</div>
				</TileButton>
				<TileButton onClick={() => router.push("/settings")}>
					<div className="flex-col flex-center gap-2 font-semibold">
						<IconCircle>
							<CogIcon className="text-purple-800 h-10" />
						</IconCircle>
						Settings
					</div>
				</TileButton>
			</div>
		</div>
	);
}
