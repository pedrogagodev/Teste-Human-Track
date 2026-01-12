import { useNavigate } from "react-router";
import { Button, buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { clearDraft } from "@/shared/form/draftStorage";

interface FormButtonsProps {
	isLoading?: boolean;
}

export function FormButtons({ isLoading }: FormButtonsProps) {
	const navigate = useNavigate();

	return (
		<div className="flex justify-end gap-3">
			<Button
				type="button"
				onClick={() => {
					clearDraft();
					navigate("/gas");
				}}
				className={cn(
					buttonVariants({ variant: "outline" }),
					"bg-white px-4 py-2 font-medium text-muted-foreground shadow-[0px_1px_2px_0px_#0000000D]",
				)}
			>
				Cancelar
			</Button>

			<Button
				type="submit"
				disabled={isLoading}
				className="border border-[#7375FC] bg-[linear-gradient(180deg,#6868EE_0%,#5451CF_100%)] px-4 py-2 font-medium shadow-[0px_1px_2px_0px_#0000000D]"
			>
				{isLoading ? (
					<>
						<Spinner className="size-4" />
						Salvando...
					</>
				) : (
					"Salvar"
				)}
			</Button>
		</div>
	);
}
