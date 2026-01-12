import { type Control, useFormState, useWatch } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import type { GASFormData } from "@/features/gas/schemas/new-gas";
import { SectionHeader } from "../../SectionHeader";
import { CustomRecurrenceFields } from "./reminders/CustomRecurrenceFields";
import { DailyRecurrenceFields } from "./reminders/DailyRecurrenceFields";
import { MonthlyRecurrenceFields } from "./reminders/MonthlyRecurrenceFields";
import { RecurrenceSelector } from "./reminders/RecurrenceSelector";
import { WeeklyRecurrenceFields } from "./reminders/WeeklyRecurrenceFields";

interface RemindersSectionProps {
	control: Control<GASFormData>;
}

export function RemindersSection({ control }: RemindersSectionProps) {
	const { errors } = useFormState({ control });
	const recurrence = useWatch({ control, name: "recurrence" });

	return (
		<section className="grid grid-cols-1 gap-2 lg:grid-cols-[240px_1fr] lg:gap-4">
			<SectionHeader
				title="Lembretes"
				description="Configure a recorrência e os dias de disparo. O paciente receberá as submissões automaticamente nos horários definidos"
			/>

			<Card>
				<CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
					<RecurrenceSelector control={control} />

					<div className="flex flex-col gap-4">
						{recurrence === "daily" && (
							<DailyRecurrenceFields control={control} />
						)}

						{recurrence === "weekly" && (
							<WeeklyRecurrenceFields control={control} />
						)}

						{recurrence === "monthly" && (
							<MonthlyRecurrenceFields control={control} />
						)}

						{recurrence === "custom" && (
							<CustomRecurrenceFields control={control} errors={errors} />
						)}
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
