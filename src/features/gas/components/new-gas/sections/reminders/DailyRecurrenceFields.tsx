import type { Control } from "react-hook-form";
import { TimeInputField } from "@/components/ui/time-input-field";
import type { GASFormData } from "@/features/gas/schemas/new-gas";

interface DailyRecurrenceFieldsProps {
	control: Control<GASFormData>;
}

export function DailyRecurrenceFields({ control }: DailyRecurrenceFieldsProps) {
	return (
		<TimeInputField
			name="dailyTime"
			control={control}
			label="Horário de disparo"
		/>
	);
}
