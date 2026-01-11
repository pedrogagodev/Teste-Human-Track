import {
	type Control,
	Controller,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TimeInputFieldProps<TFieldValues extends FieldValues> {
	name: FieldPath<TFieldValues>;
	control: Control<TFieldValues>;
	label: string;
	className?: string;
	disabled?: boolean;
}

export function TimeInputField<TFieldValues extends FieldValues>({
	name,
	control,
	label,
	className,
	disabled,
}: TimeInputFieldProps<TFieldValues>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
					<Input
						{...field}
						id={field.name}
						type="time"
						disabled={disabled}
						aria-invalid={fieldState.invalid}
						className={cn("w-32", className)}
					/>
					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
}
