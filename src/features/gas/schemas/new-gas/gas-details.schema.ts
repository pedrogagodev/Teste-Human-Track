import { z } from "zod";

export const gasDetailsSchema = z.object({
	name: z.string().min(1, "Nome da GAS é obrigatório"),
	startDate: z.date({ message: "Data inválida" }).optional(),
	endDate: z.date({ message: "Data inválida" }).optional(),
	problems: z.string().optional(),
	goalsTextDescription: z.string().optional(),
});

export type GASDetailsFormData = z.infer<typeof gasDetailsSchema>;
