import { type Control, useWatch } from "react-hook-form";
import { DatePickerField } from "@/components/ui/date-picker-field";
import { TimeInputField } from "@/components/ui/time-input-field";
import type { GASFormData } from "@/features/gas/schemas/new-gas";
import { getDayOfMonth } from "@/features/gas/utils/date.utils";

interface MonthlyRecurrenceFieldsProps {
	control: Control<GASFormData>;
}

export function MonthlyRecurrenceFields({
	control,
}: MonthlyRecurrenceFieldsProps) {
	const monthlyTime = useWatch({ control, name: "monthlyTime" });
	const monthlyDate = useWatch({ control, name: "monthlyDate" });

	const dayOfMonth = getDayOfMonth(monthlyDate);
	const previewText =
		dayOfMonth && monthlyTime
			? `Todo dia ${dayOfMonth} às ${monthlyTime}`
			: undefined;

	return (
		<>
			<DatePickerField
				name="monthlyDate"
				control={control}
				label="Selecione uma data"
				previewText={previewText}
			/>
			<TimeInputField name="monthlyTime" control={control} label="Horário" />
		</>
	);
}
