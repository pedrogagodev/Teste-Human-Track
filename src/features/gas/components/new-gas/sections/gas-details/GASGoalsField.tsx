import { type Control, Controller } from "react-hook-form";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import type { GASFormData } from "@/features/gas/schemas/new-gas";

interface GASGoalsFieldProps {
	control: Control<GASFormData>;
}

export function GASGoalsField({ control }: GASGoalsFieldProps) {
	return (
		<Controller
			name="goalsTextDescription"
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor={field.name}>Objetivos</FieldLabel>
					<Textarea
						{...field}
						id={field.name}
						aria-invalid={fieldState.invalid}
						placeholder="Descreva o resultado esperado e como você vai reconhecer melhora. Inclua métricas, frequência e prazo. Ex.: 'Aumentar a comunicação verbal na sala de aula para 8 vezes por sessão, por 2 meses."
						rows={3}
					/>
					<FieldDescription>
						Uma descrição detalhada ajuda a nossa IA a configurar metas com base
						no seu objetivo
					</FieldDescription>
					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
}
