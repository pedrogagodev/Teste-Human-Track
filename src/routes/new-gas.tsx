import { NewGASPage } from "@/features/gas/pages/new-gas-page";
import type { Route } from "./+types/new-gas";

export function meta(_: Route.MetaArgs) {
	return [
		{ title: "Nova GAS" },
		{ name: "description", content: "Nova GAS page" },
	];
}

export default NewGASPage;
