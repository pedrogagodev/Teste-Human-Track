import { type Control, Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { GASFormData } from "@/features/gas/schemas/new-gas";

interface GASNameFieldProps {
	control: Control<GASFormData>;
}

export function GASNameField({ control }: GASNameFieldProps) {
	return (
		<Controller
			name="name"
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor={field.name}>Nome da GAS</FieldLabel>
					<Input
						{...field}
						id={field.name}
						aria-invalid={fieldState.invalid}
						placeholder="Ex: GAS - Mobilidade (João)"
					/>
					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
}
