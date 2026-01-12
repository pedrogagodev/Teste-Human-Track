import {
	type Control,
	Controller,
	type UseFormGetValues,
	type UseFormTrigger,
	useFormState,
} from "react-hook-form";
import { DatePicker } from "@/components/ui/date-picker";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import type { GASFormData } from "@/features/gas/schemas/new-gas";

interface GASDateFieldsProps {
	control: Control<GASFormData>;
	trigger: UseFormTrigger<GASFormData>;
	getValues: UseFormGetValues<GASFormData>;
}

export function GASDateFields({
	control,
	trigger,
	getValues,
}: GASDateFieldsProps) {
	const { errors } = useFormState({ control });
	const today = new Date();
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<Controller
				name="startDate"
				control={control}
				render={({ field }) => {
					const hasError = !!errors.startDate;
					return (
						<Field data-invalid={hasError}>
							<FieldLabel htmlFor={field.name}>Data de início</FieldLabel>
							<DatePicker
								id={field.name}
								name={field.name}
								value={field.value}
								onChange={(date) => {
									field.onChange(date);
									trigger("startDate");
									if (getValues().endDate) {
										trigger("endDate");
									}
								}}
								onBlur={() => {
									field.onBlur();
									trigger("startDate");
									if (getValues().endDate) {
										trigger("endDate");
									}
								}}
								placeholder="Ex: 06/01/2026"
								minDate={today}
								aria-invalid={hasError}
							/>
							{hasError && <FieldError errors={[errors.startDate]} />}
						</Field>
					);
				}}
			/>
			<Controller
				name="endDate"
				control={control}
				render={({ field }) => {
					const startDate = getValues().startDate;
					const hasError = !!errors.endDate;
					return (
						<Field data-invalid={hasError}>
							<FieldLabel htmlFor={field.name}>Data final</FieldLabel>
							<DatePicker
								id={field.name}
								name={field.name}
								value={field.value}
								onChange={(date) => {
									field.onChange(date);
									trigger("endDate");
								}}
								onBlur={() => {
									field.onBlur();
									trigger("endDate");
								}}
								placeholder="Ex: 06/01/2027"
								minDate={startDate ?? today}
								aria-invalid={hasError}
							/>
							{hasError && <FieldError errors={[errors.endDate]} />}
						</Field>
					);
				}}
			/>
		</div>
	);
}
