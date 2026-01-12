export const GOAL_LEVELS = [
	{ level: -2, label: "Meta alcançada abaixo do esperado" },
	{ level: -1, label: "Meta alcançada abaixo do esperado" },
	{ level: 0, label: "Meta alcançada exatamente como o esperado" },
	{ level: 1, label: "Meta alcançada acima do esperado" },
	{ level: 2, label: "Meta alcançada acima do esperado" },
] as const;

export const GOAL_LEVEL_PLACEHOLDERS: Record<number, string> = {
	[-2]: "Ex: Paciente não conseguiu iniciar os exercícios propostos. Frequência verbal permaneceu inalterada",
	[-1]: "Ex: Paciente aumentou a frequência de comunicação para apenas 4-5 vezes por sessão",
	0: "Ex: Paciente atingiu a meta de 8 vezes de comunicação verbal por sessão por 2 meses",
	1: "Ex: Paciente superou a meta alcançando 10-12 vezes de comunicação verbal por sessão",
	2: "Ex: Paciente apresentou excepcional progresso, comunicando-se verbalmente 15+ vezes por sessão",
} as const;

export interface LevelConfig {
	level: number;
	label: string;
	placeholder: string;
}

export interface SectionConfig {
	title: string;
	levels: LevelConfig[];
}

export function createEmptyGoal() {
	return {
		id: crypto.randomUUID(),
		name: "",
		baselineLevel: "0" as const,
		levels: [
			{ level: -2, description: "" },
			{ level: -1, description: "" },
			{ level: 0, description: "" },
			{ level: 1, description: "" },
			{ level: 2, description: "" },
		],
	};
}

export const STATIC_SUGGESTION_GOAL = {
	name: "Melhorar a comunicação verbal em sala de aula",
	baselineLevel: "0",
	levels: [
		{
			level: -2,
			description:
				"O aluno não inicia nenhuma comunicação verbal espontânea durante as aulas.",
		},
		{
			level: -1,
			description:
				"O aluno inicia comunicação verbal espontânea apenas 1-2 vezes por semana.",
		},
		{
			level: 0,
			description:
				"O aluno inicia comunicação verbal espontânea pelo menos 1 vez ao dia em sala de aula.",
		},
		{
			level: 1,
			description:
				"O aluno inicia comunicação verbal espontânea 3-4 vezes ao dia em sala de aula.",
		},
		{
			level: 2,
			description:
				"O aluno inicia comunicação verbal espontânea mais de 5 vezes ao dia de forma consistente.",
		},
	],
} as {
	name: string;
	baselineLevel: "0" | "-1";
	levels: { level: number; description: string }[];
};

export function getLevelIndexInArray(level: number): number {
	return level + 2;
}

export function isGoalEmpty(goal: {
	name: string;
	levels: { description: string }[];
}) {
	const isNameEmpty = goal.name.trim() === "";
	const areLevelsEmpty = goal.levels.every((l) => l.description.trim() === "");
	return isNameEmpty && areLevelsEmpty;
}

export function getGoalLevelsConfig(
	baselineLevel: "0" | "-1",
): SectionConfig[] {
	const baseline = Number(baselineLevel);
	const sections: SectionConfig[] = [];

	sections.push({
		title: "Meta alcançada exatamente como o esperado",
		levels: [
			{
				level: baseline,
				label: `Meta ${baseline}`,
				placeholder: GOAL_LEVEL_PLACEHOLDERS[baseline],
			},
		],
	});

	const aboveLevels: LevelConfig[] = [];
	if (baseline === -1) {
		aboveLevels.push(
			{
				level: 2,
				label: "Meta 2",
				placeholder: GOAL_LEVEL_PLACEHOLDERS[2],
			},
			{
				level: 1,
				label: "Meta 1",
				placeholder: GOAL_LEVEL_PLACEHOLDERS[1],
			},
			{
				level: 0,
				label: "Meta 0",
				placeholder: GOAL_LEVEL_PLACEHOLDERS[0],
			},
		);
	} else {
		aboveLevels.push(
			{
				level: 2,
				label: "Meta 2",
				placeholder: GOAL_LEVEL_PLACEHOLDERS[2],
			},
			{
				level: 1,
				label: "Meta 1",
				placeholder: GOAL_LEVEL_PLACEHOLDERS[1],
			},
		);
	}
	sections.push({
		title: "Meta alcançada acima do esperado",
		levels: aboveLevels,
	});

	const belowLevels: LevelConfig[] = [];
	if (baseline === -1) {
		belowLevels.push({
			level: -2,
			label: "Meta -2",
			placeholder: GOAL_LEVEL_PLACEHOLDERS[-2],
		});
	} else {
		belowLevels.push(
			{
				level: -1,
				label: "Meta -1",
				placeholder: GOAL_LEVEL_PLACEHOLDERS[-1],
			},
			{
				level: -2,
				label: "Meta -2",
				placeholder: GOAL_LEVEL_PLACEHOLDERS[-2],
			},
		);
	}
	sections.push({
		title: "Meta alcançada abaixo do esperado",
		levels: belowLevels,
	});

	return sections;
}
