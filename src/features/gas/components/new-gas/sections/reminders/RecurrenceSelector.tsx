import { ChevronDown } from "lucide-react";
import {
	type Control,
	Controller,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { RECURRENCE_OPTIONS } from "@/features/gas/utils/reminders.constants";
import { cn } from "@/lib/utils";

interface RecurrenceSelectorProps<TFieldValues extends FieldValues> {
	name?: FieldPath<TFieldValues>;
	control: Control<TFieldValues>;
}

export function RecurrenceSelector<TFieldValues extends FieldValues>({
	name = "recurrence" as FieldPath<TFieldValues>,
	control,
}: RecurrenceSelectorProps<TFieldValues>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor={field.name}>Recorrência da submissão</FieldLabel>
					<div className="relative">
						<select
							id={field.name}
							name={field.name}
							value={field.value}
							onChange={(event) => field.onChange(event.target.value)}
							onBlur={field.onBlur}
							aria-invalid={fieldState.invalid}
							className={cn(
								"h-8 w-full min-w-0 appearance-none rounded-md border border-input bg-transparent px-3 py-2 pr-8 text-xs shadow-sm outline-none transition-colors placeholder:text-muted-foreground hover:cursor-pointer focus-visible:border-ring focus-visible:shadow-[0px_0px_0px_3px_var(--ring-focus)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 md:text-xs dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 dark:disabled:bg-input/80",
								!field.value && "text-muted-foreground",
							)}
						>
							<option value="" disabled>
								Ex: Semanalmente
							</option>
							{RECURRENCE_OPTIONS.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
						<ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
					</div>
					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
}
