import { GASPage } from "@/features/gas/pages/gas-page";
import type { Route } from "./+types/gas";

export function meta(_: Route.MetaArgs) {
	return [{ title: "GAS" }, { name: "description", content: "GAS page" }];
}

export default GASPage;
