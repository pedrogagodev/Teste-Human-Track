import { useCallback, useState } from "react";
import type {
	FieldArrayWithId,
	UseFieldArrayAppend,
	UseFieldArrayUpdate,
	UseFormReturn,
} from "react-hook-form";
import type { GASFormData, Goal, GoalLevel } from "../schemas/new-gas";
import { isGoalEmpty, STATIC_SUGGESTION_GOAL } from "../utils/goals.constants";

interface UseAIGoalSuggestionsProps {
	form: UseFormReturn<GASFormData>;
	update: UseFieldArrayUpdate<GASFormData, "goals">;
	append: UseFieldArrayAppend<GASFormData, "goals">;
	fields: FieldArrayWithId<GASFormData, "goals", "id">[];
}

function determineGoalUpdateStrategy(formData: GASFormData) {
	const currentGoals = formData.goals;

	if (currentGoals.length === 1 && isGoalEmpty(currentGoals[0])) {
		return {
			shouldUpdate: true,
			targetIndex: 0,
			updatedGoal: {
				...STATIC_SUGGESTION_GOAL,
				id: currentGoals[0].id,
			},
		};
	}

	return {
		shouldUpdate: false,
		targetIndex: currentGoals.length,
		updatedGoal: {
			...STATIC_SUGGESTION_GOAL,
			id: crypto.randomUUID(),
		},
	};
}

function autoFillGoalLevels(currentGoal: Goal, suggestion: Omit<Goal, "id">) {
	const updatedLevels = currentGoal.levels.map(
		(level: GoalLevel, i: number) => ({
			...level,
			description:
				level.description.trim() === ""
					? suggestion.levels[i].description
					: level.description,
		}),
	);

	const newName =
		currentGoal.name.trim() === "" ? suggestion.name : currentGoal.name;

	return {
		updatedGoal: {
			...currentGoal,
			name: newName,
			levels: updatedLevels,
		},
	};
}

export function useAIGoalSuggestions({
	form,
	update,
	append,
}: UseAIGoalSuggestionsProps) {
	const [isGenerating, setIsGenerating] = useState(false);
	const [autofillingIndex, setAutofillingIndex] = useState<number | null>(null);
	const [justUpdatedIndex, setJustUpdatedIndex] = useState<number | null>(null);

	const addAIGoal = useCallback(() => {
		setIsGenerating(true);

		setTimeout(() => {
			const { shouldUpdate, targetIndex, updatedGoal } =
				determineGoalUpdateStrategy(form.getValues());

			if (shouldUpdate) {
				update(targetIndex, updatedGoal);
			} else {
				append(updatedGoal);
			}

			form.trigger(`goals.${targetIndex}`);
			setIsGenerating(false);
			setJustUpdatedIndex(targetIndex);

			setTimeout(() => setJustUpdatedIndex(null), 1000);
		}, 2000);
	}, [form, update, append]);

	const autoFill = useCallback(
		(index: number) => {
			setAutofillingIndex(index);

			setTimeout(() => {
				const { updatedGoal } = autoFillGoalLevels(
					form.getValues().goals[index],
					STATIC_SUGGESTION_GOAL,
				);

				update(index, updatedGoal);
				form.trigger(`goals.${index}`);

				setAutofillingIndex(null);
				setJustUpdatedIndex(index);

				setTimeout(() => setJustUpdatedIndex(null), 1000);
			}, 2000);
		},
		[form, update],
	);

	return {
		isGenerating,
		autofillingIndex,
		justUpdatedIndex,
		addAIGoal,
		autoFill,
	};
}
