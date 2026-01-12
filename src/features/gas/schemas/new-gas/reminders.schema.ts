import { z } from "zod";

export const reminderDaySchema = z.object({
	day: z.enum([
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday",
		"sunday",
	]),
	enabled: z.boolean(),
	time: z
		.string()
		.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Horário inválido"),
});

const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

export const remindersSchema = z
	.object({
		recurrence: z.enum(["daily", "weekly", "monthly", "custom"]),
		dailyTime: z.string().optional(),
		weeklyDate: z.date().optional(),
		weeklyTime: z.string().optional(),
		monthlyDate: z.date().optional(),
		monthlyTime: z.string().optional(),
		days: z.array(reminderDaySchema).optional(),
	})
	.superRefine((data, ctx) => {
		if (data.recurrence === "daily") {
			if (!data.dailyTime || !timeRegex.test(data.dailyTime)) {
				ctx.addIssue({
					code: "custom",
					path: ["dailyTime"],
					message: "Horário é obrigatório",
				});
			}
		}

		if (data.recurrence === "weekly") {
			if (!data.weeklyDate) {
				ctx.addIssue({
					code: "custom",
					path: ["weeklyDate"],
					message: "Data é obrigatória",
				});
			}
			if (!data.weeklyTime || !timeRegex.test(data.weeklyTime)) {
				ctx.addIssue({
					code: "custom",
					path: ["weeklyTime"],
					message: "Horário é obrigatório",
				});
			}
		}

		if (data.recurrence === "monthly") {
			if (!data.monthlyDate) {
				ctx.addIssue({
					code: "custom",
					path: ["monthlyDate"],
					message: "Data é obrigatória",
				});
			}
			if (!data.monthlyTime || !timeRegex.test(data.monthlyTime)) {
				ctx.addIssue({
					code: "custom",
					path: ["monthlyTime"],
					message: "Horário é obrigatório",
				});
			}
		}

		if (data.recurrence === "custom") {
			if (!data.days || data.days.length === 0) {
				ctx.addIssue({
					code: "custom",
					path: ["days"],
					message: "Pelo menos um dia deve estar habilitado",
				});
			} else {
				const hasEnabledDay = data.days.some((day) => day.enabled);
				if (!hasEnabledDay) {
					ctx.addIssue({
						code: "custom",
						path: ["days"],
						message: "Pelo menos um dia deve estar habilitado",
					});
				}
			}
		}
	});

export type ReminderDay = z.infer<typeof reminderDaySchema>;
export type RemindersFormData = z.infer<typeof remindersSchema>;
