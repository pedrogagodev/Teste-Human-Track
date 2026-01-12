import { type Control, Controller, useWatch } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { GASFormData } from "@/features/gas/schemas/new-gas";
import {
	getGoalLevelsConfig,
	getLevelIndexInArray,
} from "@/features/gas/utils/goals.constants";
import { AIHelpBanner } from "../../AIHelpBanner";

interface GoalLevelsFieldsProps {
	goalIndex: number;
	control: Control<GASFormData>;
	onAutoFill?: () => void;
	isAutofilling?: boolean;
}

interface LevelFieldProps {
	level: number;
	label: string;
	placeholder: string;
	goalIndex: number;
	levelIndex: number;
	control: Control<GASFormData>;
}

function LevelField({
	level,
	label,
	placeholder,
	goalIndex,
	levelIndex,
	control,
}: LevelFieldProps) {
	return (
		<Controller
			name={`goals.${goalIndex}.levels.${levelIndex}.description`}
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel className="ml-12 text-xs">{label}</FieldLabel>
					<div className="flex gap-3">
						<div className="flex size-9 shrink-0 items-center justify-center rounded border-[#7375FC] border-[0.25px] bg-[#E9EBF8]">
							<span className="font-bold text-[#6868EE] text-lg">{level}</span>
						</div>
						<Input
							{...field}
							aria-invalid={fieldState.invalid}
							placeholder={placeholder}
							className="flex-1 text-xs"
						/>
					</div>
					{fieldState.invalid && (
						<FieldError errors={[fieldState.error]} className="ml-12" />
					)}
				</Field>
			)}
		/>
	);
}

export function GoalLevelsFields({
	goalIndex,
	control,
	onAutoFill,
	isAutofilling,
}: GoalLevelsFieldsProps) {
	const baselineLevel = useWatch({
		control,
		name: `goals.${goalIndex}.baselineLevel`,
	}) as "0" | "-1";

	const sectionsConfig = getGoalLevelsConfig(baselineLevel);

	return (
		<>
			<AIHelpBanner
				title="Use IA da HumanTrack para gerar sugestões SMART baseadas no título da meta"
				description="Inclua detalhes específicos como métricas, percentuais e prazos para melhores resultados"
				label="Sugestão de níveis"
				onSuggestionClick={onAutoFill}
				isLoading={isAutofilling}
			/>

			<div className="flex flex-col gap-6">
				{sectionsConfig.map((section) => (
					<div key={section.title} className="flex flex-col gap-4">
						<h3 className="font-semibold text-sm">{section.title}</h3>
						{section.levels.length === 1 ? (
							<LevelField
								level={section.levels[0].level}
								label={section.levels[0].label}
								placeholder={section.levels[0].placeholder}
								goalIndex={goalIndex}
								levelIndex={getLevelIndexInArray(section.levels[0].level)}
								control={control}
							/>
						) : (
							<div className="flex flex-col gap-4">
								{section.levels.map((levelConfig) => (
									<LevelField
										key={levelConfig.level}
										level={levelConfig.level}
										label={levelConfig.label}
										placeholder={levelConfig.placeholder}
										goalIndex={goalIndex}
										levelIndex={getLevelIndexInArray(levelConfig.level)}
										control={control}
									/>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		</>
	);
}
