import {
	type Control,
	Controller,
	type FieldErrors,
	useFieldArray,
} from "react-hook-form";
import { FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { GASFormData } from "@/features/gas/schemas/new-gas";
import { DAYS_OF_WEEK } from "@/features/gas/utils/reminders.constants";
import { cn } from "@/lib/utils";

interface CustomRecurrenceFieldsProps {
	control: Control<GASFormData>;
	errors: FieldErrors<GASFormData>;
}

export function CustomRecurrenceFields({
	control,
	errors,
}: CustomRecurrenceFieldsProps) {
	useFieldArray({
		control,
		name: "days",
	});

	return (
		<>
			<FieldLabel>Dias de disparo</FieldLabel>
			<div className="flex flex-col gap-4">
				{DAYS_OF_WEEK.map((day, index) => {
					const dayError = errors.days?.[index];

					return (
						<div key={day.value} className="flex items-center rounded-md">
							<Controller
								name={`days.${index}.enabled`}
								control={control}
								render={({ field: enabledField }) => (
									<>
										<Switch
											checked={enabledField.value}
											onCheckedChange={enabledField.onChange}
											aria-label={`Ativar ${day.label}`}
											className="mr-3"
										/>

										<span className="mr-2 min-w-[100px] text-sm">
											{day.label}
										</span>

										<Controller
											name={`days.${index}.time`}
											control={control}
											render={({ field: timeField, fieldState }) => (
												<div>
													<Input
														{...timeField}
														type="time"
														disabled={!enabledField.value}
														aria-invalid={fieldState.invalid || !!dayError}
														className={cn(
															"h-8 w-32 rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-sm outline-none transition-colors focus-visible:border-ring focus-visible:shadow-[0px_0px_0px_3px_var(--ring-focus)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20",
															enabledField.value &&
																"border-primary ring-1 ring-primary/20",
														)}
													/>
													{(fieldState.invalid || dayError) && (
														<FieldError
															errors={[fieldState.error, dayError?.time]}
														/>
													)}
												</div>
											)}
										/>
									</>
								)}
							/>
						</div>
					);
				})}
			</div>
			{errors.days && typeof errors.days === "object" && (
				<FieldError errors={[errors.days]} />
			)}
		</>
	);
}
