import { Info } from "lucide-react";
import type {
	Control,
	FieldArrayWithId,
	UseFieldArrayAppend,
	UseFieldArrayRemove,
	UseFieldArrayUpdate,
	UseFormGetValues,
} from "react-hook-form";
import { useFormState } from "react-hook-form";
import { toast } from "sonner";
import { FieldError } from "@/components/ui/field";
import type { GASFormData } from "@/features/gas/schemas/new-gas";
import { isEmpty } from "@/features/gas/utils/field.utils";
import { createEmptyGoal } from "@/features/gas/utils/goals.constants";
import { SectionHeader } from "../../SectionHeader";
import { GoalCard } from "./goals";

interface GoalsSectionProps {
	control: Control<GASFormData>;
	fields: FieldArrayWithId<GASFormData, "goals", "id">[];
	append: UseFieldArrayAppend<GASFormData, "goals">;
	remove: UseFieldArrayRemove;
	update: UseFieldArrayUpdate<GASFormData, "goals">;
	getValues: UseFormGetValues<GASFormData>;
	onAutoFill: (index: number) => void;
	autofillingGoalIndex?: number | null;
	justUpdatedGoalIndex?: number | null;
}

const REQUIRED_FIELDS = [{ key: "name", label: "Nome da meta" }] as const;

export function GoalsSection({
	control,
	fields,
	append,
	remove,
	getValues,
	onAutoFill,
	autofillingGoalIndex,
	justUpdatedGoalIndex,
}: GoalsSectionProps) {
	const { errors } = useFormState({ control });

	function handleAddGoal() {
		append(createEmptyGoal());
	}

	function handleDuplicateGoal(index: number) {
		const goal = getValues().goals[index];
		append({
			...goal,
			id: crypto.randomUUID(),
			name: `${goal.name} (cópia)`,
		});
	}

	function handleDeleteGoal(index: number) {
		if (fields.length > 1) {
			remove(index);
		}
	}

	function handleAutoFill(index: number) {
		const currentGoal = getValues().goals[index];
		const missingFields = REQUIRED_FIELDS.filter(({ key }) =>
			isEmpty(currentGoal[key as keyof typeof currentGoal]),
		).map(({ label }) => label);

		if (missingFields.length > 0) {
			toast.warning(
				`Preencha o campo ${missingFields.join(", ")} antes de gerar sugestões`,
			);
			return;
		}

		onAutoFill(index);
	}
	return (
		<section className="grid grid-cols-1 gap-2 lg:grid-cols-[240px_1fr] lg:gap-4">
			<SectionHeader
				title="Metas"
				description="Crie metas com escala completa (-2 a +2). Quanto mais específico for o texto de cada nível, mais fácil será interpretar a evolução"
			>
				<div className="mt-2 flex items-start gap-2 rounded-lg bg-information-background p-3 ring-1 ring-information-stroke">
					<Info className="size-4 shrink-0 font-bold text-information-foreground" />
					<div className="flex flex-col gap-1">
						<p className="font-bold text-information-foreground text-xs">
							Nível base da meta
						</p>
						<p className="text-information-foreground text-xs">
							Você pode usar o <span className="font-semibold">Nível 0</span> ou
							o <span className="font-semibold">Nível -1</span> como linha base,
							de acordo com o contexto do paciente
						</p>
					</div>
				</div>
			</SectionHeader>

			<div className="flex flex-col gap-6">
				{fields.map((field, goalIndex) => (
					<GoalCard
						key={field.id}
						goalIndex={goalIndex}
						control={control}
						errors={errors}
						onDuplicate={() => handleDuplicateGoal(goalIndex)}
						onDelete={() => handleDeleteGoal(goalIndex)}
						onAutoFill={() => handleAutoFill(goalIndex)}
						isLast={goalIndex === fields.length - 1}
						onAddNew={handleAddGoal}
						isAutofilling={autofillingGoalIndex === goalIndex}
						shouldAnimate={justUpdatedGoalIndex === goalIndex}
					/>
				))}

				{errors.goals && typeof errors.goals === "object" && (
					<FieldError errors={[errors.goals]} />
				)}
			</div>
		</section>
	);
}
