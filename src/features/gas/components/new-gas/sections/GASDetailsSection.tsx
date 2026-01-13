import type {
	Control,
	UseFormGetValues,
	UseFormTrigger,
} from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import type { GASFormData } from "@/features/gas/schemas/new-gas";
import { isEmpty } from "@/features/gas/utils/field.utils";
import { SectionHeader } from "../../SectionHeader";
import { AIHelpBanner } from "../AIHelpBanner";
import {
	GASDateFields,
	GASGoalsField,
	GASNameField,
	GASProblemsField,
} from "./gas-details";

interface GASDetailsSectionProps {
	control: Control<GASFormData>;
	trigger: UseFormTrigger<GASFormData>;
	getValues: UseFormGetValues<GASFormData>;
	onAddAIGoal: () => void;
	isGenerating?: boolean;
}

const REQUIRED_FIELDS = [
	{ key: "name", label: "Nome da GAS" },
	{ key: "startDate", label: "Data de início" },
	{ key: "endDate", label: "Data final" },
	{ key: "problems", label: "Problemas" },
	{ key: "goalsTextDescription", label: "Objetivos" },
] as const;

export function GASDetailsSection({
	control,
	trigger,
	getValues,
	onAddAIGoal,
	isGenerating,
}: GASDetailsSectionProps) {
	function handleAISuggestionClick() {
		const values = getValues();

		const missingFields = REQUIRED_FIELDS.filter(({ key }) =>
			isEmpty(values[key as keyof typeof values]),
		).map(({ label }) => label);

		if (missingFields.length > 0) {
			const fieldsList = missingFields.join(", ");
			toast.warning(
				`Preencha todos os campos antes de gerar sugestões: ${fieldsList}`,
			);
			return;
		}

		onAddAIGoal();
	}

	return (
		<section className="grid grid-cols-1 gap-2 lg:grid-cols-[240px_1fr] lg:gap-4">
			<SectionHeader
				title="Detalhes da GAS"
				description="Defina o contexto clínico da GAS. Essas informações ajudam a organizar o acompanhamento e melhoram as sugestões da IA"
			/>

			<Card>
				<CardContent className="flex flex-col gap-6">
					<GASNameField control={control} />
					<GASDateFields control={control} trigger={trigger} />
					<GASProblemsField control={control} />
					<GASGoalsField control={control} />
					<AIHelpBanner
						title="Use IA da HumanTrack para gerar sugestões SMART baseadas no título da meta"
						description="Inclua detalhes específicos como métricas, percentuais e prazos para melhores resultados"
						label="Sugestão de meta"
						onSuggestionClick={handleAISuggestionClick}
						isLoading={isGenerating}
					/>
				</CardContent>
			</Card>
		</section>
	);
}
