import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { clearDraft, loadDraft } from "@/shared/form/draftStorage";
import { useDraftSync } from "@/shared/form/useDraftSync";
import { type GASFormData, gasFormSchema } from "../schemas/new-gas";
import { createEmptyGoal } from "../utils/goals.constants";
import { useAIGoalSuggestions } from "./useAIGoalSuggestions";

const defaultDays = [
	{ day: "monday" as const, enabled: false, time: "12:00" },
	{ day: "tuesday" as const, enabled: false, time: "12:00" },
	{ day: "wednesday" as const, enabled: false, time: "12:00" },
	{ day: "thursday" as const, enabled: false, time: "12:00" },
	{ day: "friday" as const, enabled: false, time: "12:00" },
	{ day: "saturday" as const, enabled: false, time: "12:00" },
	{ day: "sunday" as const, enabled: false, time: "12:00" },
];

function getDefaultValues(): GASFormData {
	return {
		name: "",
		startDate: undefined,
		endDate: undefined,
		problems: "",
		goalsTextDescription: "",
		patientId: "",
		phone: "",
		recurrence: "daily",
		dailyTime: "12:00",
		weeklyDate: undefined,
		weeklyTime: "12:00",
		monthlyDate: undefined,
		monthlyTime: "12:00",
		days: defaultDays,
		goals: [createEmptyGoal()],
	};
}

export function useGasForm() {
	const navigate = useNavigate();

	const form = useForm<GASFormData>({
		resolver: zodResolver(gasFormSchema),
		mode: "onChange",
		defaultValues: loadDraft() ?? getDefaultValues(),
	});

	useDraftSync(form);

	const { fields, append, remove, update } = useFieldArray({
		control: form.control,
		name: "goals",
	});

	const goalsHandlers = useAIGoalSuggestions({
		form,
		update,
		append,
		fields,
	});

	async function onSubmit() {
		clearDraft();
		await new Promise((resolve) => setTimeout(resolve, 2000));
		toast.success("GAS salva com sucesso!");
		navigate("/gas");
	}

	return {
		form,
		goalsHandlers,
		isGeneratingSuggestions: goalsHandlers.isGenerating,
		autofillingGoalIndex: goalsHandlers.autofillingIndex,
		justUpdatedGoalIndex: goalsHandlers.justUpdatedIndex,
		goalsFields: fields,
		appendGoal: append,
		removeGoal: remove,
		updateGoal: update,
		onSubmit,
	};
}
