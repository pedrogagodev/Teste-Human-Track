import { z } from "zod";

import { startOfDay } from "../../utils/date.utils";
import { gasDetailsSchema } from "./gas-details.schema";
import { goalLevelSchema, goalSchema, goalsSchema } from "./goals.schema";
import { patientDetailsSchema } from "./patient.schema";
import { reminderDaySchema, remindersSchema } from "./reminders.schema";

export {
	gasDetailsSchema,
	patientDetailsSchema,
	reminderDaySchema,
	remindersSchema,
	goalLevelSchema,
	goalSchema,
	goalsSchema,
};

export type { GASDetailsFormData } from "./gas-details.schema";
export type { Goal, GoalLevel, GoalsFormData } from "./goals.schema";
export type { PatientDetailsFormData } from "./patient.schema";
export type { ReminderDay, RemindersFormData } from "./reminders.schema";

export const gasFormSchema = z
	.object({
		...gasDetailsSchema.shape,
		...patientDetailsSchema.shape,
		...remindersSchema.shape,
		...goalsSchema.shape,
	})
	.refine(
		(data) => {
			if (!data.startDate) return true;
			return startOfDay(data.startDate) >= startOfDay(new Date());
		},
		{
			message: "Data de início não pode ser anterior a hoje",
			path: ["startDate"],
		},
	)
	.refine(
		(data) => {
			if (!data.startDate || !data.endDate) return true;
			return startOfDay(data.endDate) >= startOfDay(data.startDate);
		},
		{
			message: "Data final não pode ser anterior à data de início",
			path: ["endDate"],
		},
	);

export type GASFormData = z.infer<typeof gasFormSchema>;
