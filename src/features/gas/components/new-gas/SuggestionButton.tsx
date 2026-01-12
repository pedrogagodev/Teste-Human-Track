import { WandSparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface SuggestionButtonProps {
	label: string;
	onClick?: () => void;
	disabled?: boolean;
	isLoading?: boolean;
}

export function SuggestionButton({
	label,
	onClick,
	disabled,
	isLoading,
}: SuggestionButtonProps) {
	return (
		<Button
			type="button"
			variant="ghost"
			onClick={onClick}
			disabled={disabled || isLoading}
			className="relative w-fit overflow-hidden rounded-sm border-[#5451CF] px-3 py-2 font-medium text-[#5451CF] hover:cursor-pointer hover:bg-transparent"
		>
			<AnimatePresence mode="popLayout" initial={false}>
				{isLoading ? (
					<motion.div
						key="loading"
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -20, opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="flex items-center gap-2"
					>
						<Spinner className="size-4 text-[#5451CF]" />
						Gerando
					</motion.div>
				) : (
					<motion.div
						key="default"
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 20, opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="flex items-center gap-2"
					>
						<WandSparkles className="size-4" />
						{label}
					</motion.div>
				)}
			</AnimatePresence>
		</Button>
	);
}
