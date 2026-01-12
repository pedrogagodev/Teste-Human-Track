import { type Control, Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { GASFormData } from "@/features/gas/schemas/new-gas";

interface GoalNameFieldProps {
	goalIndex: number;
	control: Control<GASFormData>;
}

export function GoalNameField({ goalIndex, control }: GoalNameFieldProps) {
	return (
		<Controller
			name={`goals.${goalIndex}.name`}
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor={field.name}>Nome</FieldLabel>
					<Input
						{...field}
						id={field.name}
						aria-invalid={fieldState.invalid}
						placeholder="Ex: Comunicação verbal na sala de aula"
					/>
					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
}
