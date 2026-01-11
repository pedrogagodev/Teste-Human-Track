import { ChevronDown, Eye, EyeOff, User } from "lucide-react";
import { Link, useLocation } from "react-router";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePatientData } from "@/shared/contexts/PatientDataContext";

const breadcrumbItems = [
	{ path: "/", label: "Home" },
	{ path: "/gas", label: "GAS" },
	{ path: "/new-gas", label: "Nova GAS" },
];

export default function Header() {
	const { patientDataEnabled, togglePatientData } = usePatientData();
	const location = useLocation();
	const currentPath = location.pathname;
	const isNewGasPage = currentPath === "/new-gas";

	return (
		<TooltipProvider>
			<header className="flex items-center justify-between border-border border-b bg-background">
				<div className="px-4 py-4 sm:px-6 sm:py-6">
					<Breadcrumb>
						<BreadcrumbList>
							{breadcrumbItems.map((item, index) => {
								const isCurrentPage = currentPath === item.path;
								const isLast = index === breadcrumbItems.length - 1;

								return (
									<BreadcrumbItem key={item.path}>
										{isCurrentPage ? (
											<BreadcrumbPage>{item.label}</BreadcrumbPage>
										) : (
											<BreadcrumbLink render={<Link to={item.path} />}>
												{item.label}
											</BreadcrumbLink>
										)}
										{!isLast && <BreadcrumbSeparator />}
									</BreadcrumbItem>
								);
							})}
						</BreadcrumbList>
					</Breadcrumb>
				</div>

				<div className="flex items-center gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-6">
					{isNewGasPage && (
						<Tooltip>
							<TooltipTrigger>
								<div className="flex items-center gap-2">
									{patientDataEnabled ? (
										<Eye className="size-4 text-muted-foreground lg:hidden" />
									) : (
										<EyeOff className="size-4 text-muted-foreground lg:hidden" />
									)}
									<Switch
										checked={patientDataEnabled}
										onCheckedChange={togglePatientData}
										aria-label="Mostrar dados do paciente"
									/>
									<span className="hidden text-foreground text-sm lg:inline">
										Dados do paciente
									</span>
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>
									{patientDataEnabled ? "Ocultar" : "Mostrar"} dados do paciente
								</p>
							</TooltipContent>
						</Tooltip>
					)}

					<DropdownMenu>
						<DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-border bg-muted/50 p-2 text-muted-foreground shadow-sm outline-none transition-colors hover:cursor-pointer hover:bg-muted sm:rounded-sm sm:px-3 sm:py-2">
							<User className="size-4" />
							<span className="hidden text-sm sm:inline">Minha conta</span>
							<ChevronDown className="hidden size-4 sm:block" />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>Perfil</DropdownMenuItem>
							<DropdownMenuItem>Configurações</DropdownMenuItem>
							<DropdownMenuItem className="text-destructive hover:text-destructive!">
								Sair
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
		</TooltipProvider>
	);
}
