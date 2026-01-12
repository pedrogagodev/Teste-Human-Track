import { type Control, useWatch } from "react-hook-form";
import { DatePickerField } from "@/components/ui/date-picker-field";
import { TimeInputField } from "@/components/ui/time-input-field";
import type { GASFormData } from "@/features/gas/schemas/new-gas";
import { getDayOfWeekName } from "@/features/gas/utils/date.utils";

interface WeeklyRecurrenceFieldsProps {
	control: Control<GASFormData>;
}

export function WeeklyRecurrenceFields({
	control,
}: WeeklyRecurrenceFieldsProps) {
	const weeklyTime = useWatch({ control, name: "weeklyTime" });
	const weeklyDate = useWatch({ control, name: "weeklyDate" });

	const previewText =
		weeklyDate && weeklyTime
			? `Todo(a) ${getDayOfWeekName(weeklyDate)} às ${weeklyTime}`
			: undefined;

	return (
		<>
			<DatePickerField
				name="weeklyDate"
				control={control}
				label="Selecione uma data"
				previewText={previewText}
			/>
			<TimeInputField name="weeklyTime" control={control} label="Horário" />
		</>
	);
}
