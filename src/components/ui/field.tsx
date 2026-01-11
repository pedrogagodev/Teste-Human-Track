import type * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
	"data-invalid"?: boolean;
}

function Field({ className, ...props }: FieldProps) {
	return (
		<div
			data-slot="field"
			className={cn("flex flex-col gap-2", className)}
			{...props}
		/>
	);
}

interface FieldLabelProps extends React.ComponentProps<typeof Label> {}

function FieldLabel({ className, ...props }: FieldLabelProps) {
	return (
		<Label
			data-slot="field-label"
			className={cn(className, "font-medium text-sm")}
			{...props}
		/>
	);
}

interface FieldDescriptionProps
	extends React.HTMLAttributes<HTMLParagraphElement> {}

function FieldDescription({ className, ...props }: FieldDescriptionProps) {
	return (
		<p
			data-slot="field-description"
			className={cn("text-muted-foreground text-xs", className)}
			{...props}
		/>
	);
}

interface FieldErrorProps extends React.HTMLAttributes<HTMLDivElement> {
	errors?: Array<{ message?: string } | undefined>;
}

function FieldError({ errors, className, ...props }: FieldErrorProps) {
	const errorMessages = errors
		?.filter(Boolean)
		.map((e) => e?.message)
		.filter(Boolean);

	if (!errorMessages || errorMessages.length === 0) {
		return null;
	}

	return (
		<div
			data-slot="field-error"
			className={cn("text-destructive text-xs", className)}
			role="alert"
			{...props}
		>
			{errorMessages.map((message, i) => (
				<p key={`error-${i}-${message}`}>{message}</p>
			))}
		</div>
	);
}

export { Field, FieldLabel, FieldDescription, FieldError };
