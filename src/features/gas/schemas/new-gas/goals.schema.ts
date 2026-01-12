import { z } from "zod";

export const goalLevelSchema = z.object({
	level: z.number().min(-2).max(2),
	description: z.string().min(1, "Descrição do nível é obrigatória"),
});

export const goalSchema = z.object({
	id: z.string(),
	name: z.string().min(1, "Nome da meta é obrigatório"),
	baselineLevel: z.enum(["0", "-1"]),
	levels: z.array(goalLevelSchema).length(5),
});

export const goalsSchema = z.object({
	goals: z.array(goalSchema).min(1, "Adicione pelo menos uma meta"),
});

export type GoalLevel = z.infer<typeof goalLevelSchema>;
export type Goal = z.infer<typeof goalSchema>;
export type GoalsFormData = z.infer<typeof goalsSchema>;
