import { type Control, Controller } from "react-hook-form";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import type { GASFormData } from "@/features/gas/schemas/new-gas";

interface GASProblemsFieldProps {
	control: Control<GASFormData>;
}

export function GASProblemsField({ control }: GASProblemsFieldProps) {
	return (
		<Controller
			name="problems"
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor={field.name}>Problemas</FieldLabel>
					<Textarea
						{...field}
						id={field.name}
						aria-invalid={fieldState.invalid}
						placeholder="Descreva o principal problema funcional, o contexto em que ocorre e como isso impacta o paciente. Ex.: 'Dificuldade em iniciar comunicação verbal na sala de aula"
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
