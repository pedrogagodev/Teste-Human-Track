import {
	CircleCheckIcon,
	InfoIcon,
	Loader2Icon,
	OctagonXIcon,
	TriangleAlertIcon,
} from "lucide-react";
import type { ToasterProps } from "sonner";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
	return (
		<Sonner
			theme="light"
			className="toaster group"
			icons={{
				success: <CircleCheckIcon className="size-4 text-primary" />,
				info: <InfoIcon className="size-4 text-primary" />,
				warning: <TriangleAlertIcon className="size-4 text-primary" />,
				error: <OctagonXIcon className="size-4 text-destructive" />,
				loading: <Loader2Icon className="size-4 animate-spin text-primary" />,
			}}
			toastOptions={{
				classNames: {
					toast:
						"group toast bg-card text-card-foreground border border-border rounded-2xl shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.05)]",
					description: "text-muted-foreground",
					actionButton:
						"bg-primary text-primary-foreground hover:bg-primary/90",
					cancelButton: "bg-muted text-muted-foreground hover:bg-muted/80",
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
