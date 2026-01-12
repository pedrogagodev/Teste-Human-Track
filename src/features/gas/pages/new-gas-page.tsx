import { usePatientData } from "@/shared/contexts/PatientDataContext";
import { FormButtons } from "../components/new-gas/FormButtons";
import { GASDetailsSection } from "../components/new-gas/sections/GASDetailsSection";
import { GoalsSection } from "../components/new-gas/sections/GoalsSection";
import { PatientDetailsSection } from "../components/new-gas/sections/PatientDetailsSection";
import { RemindersSection } from "../components/new-gas/sections/RemindersSection";
import { useGasForm } from "../hooks/useGasForm";

export function NewGASPage() {
	const { patientDataEnabled } = usePatientData();
	const {
		form,
		goalsHandlers,
		isGeneratingSuggestions,
		autofillingGoalIndex,
		justUpdatedGoalIndex,
		goalsFields,
		appendGoal,
		removeGoal,
		updateGoal,
		onSubmit,
	} = useGasForm();

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<div className="container mx-auto max-w-5xl space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8">
				<h1 className="font-semibold text-2xl">Configurar nova GAS</h1>

				<GASDetailsSection
					control={form.control}
					trigger={form.trigger}
					getValues={form.getValues}
					onAddAIGoal={goalsHandlers.addAIGoal}
					isGenerating={isGeneratingSuggestions}
				/>
				<PatientDetailsSection
					control={form.control}
					patientDataEnabled={patientDataEnabled}
				/>
				<RemindersSection control={form.control} />
				<GoalsSection
					control={form.control}
					fields={goalsFields}
					append={appendGoal}
					remove={removeGoal}
					update={updateGoal}
					getValues={form.getValues}
					onAutoFill={goalsHandlers.autoFill}
					autofillingGoalIndex={autofillingGoalIndex}
					justUpdatedGoalIndex={justUpdatedGoalIndex}
				/>
				<FormButtons isLoading={form.formState.isSubmitting} />
			</div>
		</form>
	);
}
