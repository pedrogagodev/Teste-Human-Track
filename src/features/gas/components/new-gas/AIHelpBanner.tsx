import { Info } from "lucide-react";
import { SuggestionButton } from "./SuggestionButton";

interface AIHelpBannerProps {
	title: string;
	description: string;
	onSuggestionClick?: () => void;
	label?: string;
	isLoading?: boolean;
}

export function AIHelpBanner({
	title,
	description,
	onSuggestionClick,
	label = "Ajuda da IA",
	isLoading,
}: AIHelpBannerProps) {
	return (
		<div className="flex gap-3 rounded-lg bg-[#F1F3FA] p-4 ring-1 ring-[#E9EBF8]">
			<Info className="size-4 shrink-0 stroke-3 font-bold text-[#5451CF]" />
			<div className="flex flex-col gap-2">
				<p className="font-semibold text-[#5451CF] text-xs">{title}</p>
				<p className="text-[#5451CF] text-xs">{description}</p>
				<SuggestionButton
					label={label}
					onClick={onSuggestionClick}
					disabled={!onSuggestionClick}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
}
