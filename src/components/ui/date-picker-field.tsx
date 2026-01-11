import {
	type Control,
	Controller,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

interface DatePickerFieldProps<TFieldValues extends FieldValues> {
	name: FieldPath<TFieldValues>;
	control: Control<TFieldValues>;
	label: string;
	className?: string;
	previewText?: string;
}

export function DatePickerField<TFieldValues extends FieldValues>({
	name,
	control,
	label,
	className,
	previewText,
}: DatePickerFieldProps<TFieldValues>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
					<Calendar
						mode="single"
						selected={field.value}
						onSelect={field.onChange}
						captionLayout="dropdown"
						className={className || "w-full"}
					/>
					{previewText && (
						<p className="text-muted-foreground text-sm">{previewText}</p>
					)}
					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
}
