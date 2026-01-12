import { ChevronDown } from "lucide-react";
import { type Control, Controller } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { PhoneInput } from "@/components/ui/phone-input";
import type { GASFormData } from "@/features/gas/schemas/new-gas";
import { cn } from "@/lib/utils";
import { SectionHeader } from "../../SectionHeader";

const mockPatients = [
	{ id: "patient-1", name: "Bruce Wayne" },
	{ id: "patient-2", name: "Diana Prince" },
	{ id: "patient-3", name: "Clark Kent" },
];

const selectClassName =
	"h-8 w-full min-w-0 appearance-none rounded-md border border-input bg-transparent px-3 py-2 pr-8 text-xs shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-[0px_0px_0px_3px_var(--ring-focus)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 md:text-xs dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 dark:disabled:bg-input/80";

function maskValue(value: string) {
	return value.length > 0 ? "•".repeat(value.length) : "";
}

interface PatientDetailsSectionProps {
	control: Control<GASFormData>;
	patientDataEnabled?: boolean;
}

export function PatientDetailsSection({
	control,
	patientDataEnabled = true,
}: PatientDetailsSectionProps) {
	return (
		<section className="grid grid-cols-1 gap-2 lg:grid-cols-[240px_1fr] lg:gap-4">
			<SectionHeader
				title="Detalhes do paciente"
				description="Associe a GAS a um paciente. O telefone é usado para o envio das submissões via WhatsApp"
			/>

			<Card>
				<CardContent className="grid gap-4 sm:grid-cols-2">
					<Controller
						name="patientId"
						control={control}
						render={({ field, fieldState }) => {
							const value = field.value ?? "";
							const selectedPatient = mockPatients.find((p) => p.id === value);
							const isMasked = !patientDataEnabled && !!selectedPatient;

							return (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>Paciente</FieldLabel>
									<div className="relative">
										{isMasked ? (
											<input
												id={field.name}
												disabled
												value={maskValue(selectedPatient.name)}
												className={cn(selectClassName, "bg-transparent")}
											/>
										) : (
											<select
												id={field.name}
												name={field.name}
												value={value}
												onChange={(event) => field.onChange(event.target.value)}
												onBlur={field.onBlur}
												aria-invalid={fieldState.invalid}
												className={cn(
													selectClassName,
													!value && "text-muted-foreground",
												)}
												disabled={!patientDataEnabled && !!value}
											>
												<option value="" disabled>
													Ex: Bruce Wayne
												</option>
												{mockPatients.map((patient) => (
													<option key={patient.id} value={patient.id}>
														{patient.name}
													</option>
												))}
											</select>
										)}
										<ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
									</div>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							);
						}}
					/>

					<Controller
						name="phone"
						control={control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Telefone</FieldLabel>
								<PhoneInput
									{...field}
									id={field.name}
									aria-invalid={fieldState.invalid}
									placeholder="Ex: (21) 97143-7438"
									defaultCountry="br"
									masked={!patientDataEnabled}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</CardContent>
			</Card>
		</section>
	);
}
