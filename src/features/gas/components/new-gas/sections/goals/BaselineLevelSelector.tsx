import { type Control, Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { GASFormData } from "@/features/gas/schemas/new-gas";

interface BaselineLevelSelectorProps {
	goalIndex: number;
	control: Control<GASFormData>;
}

export function BaselineLevelSelector({
	goalIndex,
	control,
}: BaselineLevelSelectorProps) {
	return (
		<Controller
			name={`goals.${goalIndex}.baselineLevel`}
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel>Linha base da Meta</FieldLabel>
					<div className="flex flex-col gap-4">
						<Label className="flex cursor-pointer items-center gap-2">
							<Input
								type="radio"
								name={field.name}
								value="0"
								checked={field.value === "0"}
								onChange={() => field.onChange("0")}
								className="size-4 cursor-pointer accent-primary"
								aria-invalid={fieldState.invalid}
							/>
							<span className="text-sm">Nível 0</span>
						</Label>
						<Label className="flex cursor-pointer items-center gap-2">
							<Input
								type="radio"
								name={field.name}
								value="-1"
								checked={field.value === "-1"}
								onChange={() => field.onChange("-1")}
								className="size-4 cursor-pointer accent-primary"
								aria-invalid={fieldState.invalid}
							/>
							<span className="text-sm">Nível -1</span>
						</Label>
					</div>
					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
}
