import { z } from "zod";
import { phoneSchema } from "@/components/ui/phone-input";

export const patientDetailsSchema = z.object({
	patientId: z.string().min(1, "Selecione um paciente"),
	phone: z.string().min(1, "Telefone é obrigatório").and(phoneSchema),
});

export type PatientDetailsFormData = z.infer<typeof patientDetailsSchema>;
