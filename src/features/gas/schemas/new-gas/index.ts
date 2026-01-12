import { z } from "zod";

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

export const gasFormSchema = z.object({
	...gasDetailsSchema.shape,
	...patientDetailsSchema.shape,
	...remindersSchema.shape,
	...goalsSchema.shape,
});

export type GASFormData = z.infer<typeof gasFormSchema>;
