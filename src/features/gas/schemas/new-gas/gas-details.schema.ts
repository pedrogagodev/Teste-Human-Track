import { z } from "zod";

import { startOfDay } from "../../utils/date.utils";

export const gasDetailsSchema = z
	.object({
		name: z.string().min(1, "Nome da GAS é obrigatório"),
		startDate: z.date({ message: "Data inválida" }).optional(),
		endDate: z.date({ message: "Data inválida" }).optional(),
		problems: z.string().optional(),
		goalsTextDescription: z.string().optional(),
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

export type GASDetailsFormData = z.infer<typeof gasDetailsSchema>;
