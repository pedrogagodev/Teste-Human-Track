import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";
import type { Route } from "./+types/_index";

export function meta(_: Route.MetaArgs) {
	return [{ title: "Home" }, { name: "description", content: "Home page" }];
}

export default function Home() {
	return (
		<div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center gap-6 px-4 py-2">
			<div className="space-y-2 text-center">
				<h1 className="font-bold text-3xl">
					Bem-vindo ao teste técnico da Human Track
				</h1>
				<p className="text-lg text-muted-foreground">
					Para começar, clique no botão abaixo para criar uma nova GAS.
				</p>
			</div>

			<Link to="/new-gas" className={buttonVariants({ size: "lg" })}>
				Criar Nova GAS
			</Link>
		</div>
	);
}
