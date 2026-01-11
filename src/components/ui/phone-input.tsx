import { lookup } from "country-data-list";
import parsePhoneNumber, { isValidPhoneNumber } from "libphonenumber-js";
import { GlobeIcon, PencilLine } from "lucide-react";
import { forwardRef, useState } from "react";
import { CircleFlag } from "react-circle-flags";
import { z } from "zod";
import { cn } from "@/lib/utils";

export const phoneSchema = z.string().refine((value) => {
	try {
		return isValidPhoneNumber(value);
	} catch {
		return false;
	}
}, "Número de telefone inválido");

export type CountryData = {
	alpha2: string;
	alpha3: string;
	countryCallingCodes: string[];
	currencies: string[];
	emoji?: string;
	ioc: string;
	languages: string[];
	name: string;
	status: string;
};

interface PhoneInputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	onCountryChange?: (data: CountryData | undefined) => void;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	defaultCountry?: string;
	className?: string;
	inline?: boolean;
	masked?: boolean;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
	(
		{
			className,
			onCountryChange,
			onChange,
			value,
			placeholder,
			defaultCountry,
			inline = false,
			masked = false,
			...props
		},
		ref,
	) => {
		const [_countryData, setCountryData] = useState<CountryData | undefined>();
		const [displayFlag, setDisplayFlag] = useState<string>("");

		const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			let newValue = e.target.value;
			const wasEmpty = !value || value.trim().length === 0;
			let autoAddedBrazil = false;

			if (wasEmpty && newValue.length > 0 && !newValue.startsWith("+")) {
				newValue = `+55${newValue}`;
				autoAddedBrazil = true;
			} else if (!newValue.startsWith("+")) {
				if (newValue.startsWith("00")) {
					newValue = `+${newValue.slice(2)}`;
				} else {
					newValue = `+${newValue}`;
				}
			}

			try {
				const parsed = parsePhoneNumber(newValue);
				console.log("Phone number details:", {
					isPossible: parsed?.isPossible(),
					isValid: parsed?.isValid(),
					country: parsed?.country,
					nationalNumber: parsed?.nationalNumber,
					formatNational: parsed?.formatNational(),
					formatInternational: parsed?.formatInternational(),
					getType: parsed?.getType(),
					countryCallingCode: parsed?.countryCallingCode,
					getURI: parsed?.getURI(),
					parsed: parsed,
				});

				if (autoAddedBrazil || parsed?.country) {
					const countryCode = autoAddedBrazil ? "br" : parsed?.country || "br";
					console.log("Setting flag to:", countryCode.toLowerCase());

					setDisplayFlag("");
					setTimeout(() => {
						setDisplayFlag(countryCode.toLowerCase());
					}, 0);

					const countryInfo = lookup.countries({ alpha2: countryCode })[0];
					if (countryInfo) {
						setCountryData(countryInfo);
						onCountryChange?.(countryInfo);
					}

					const syntheticEvent = {
						...e,
						target: {
							...e.target,
							value: parsed?.number || newValue,
						},
					} as React.ChangeEvent<HTMLInputElement>;
					onChange?.(syntheticEvent);
				} else {
					onChange?.(e);
					setDisplayFlag("");
					setCountryData(undefined);
					onCountryChange?.(undefined);
				}
			} catch (error) {
				if (autoAddedBrazil) {
					setDisplayFlag("");
					setTimeout(() => {
						setDisplayFlag("br");
					}, 0);

					const countryInfo = lookup.countries({ alpha2: "br" })[0];
					setCountryData(countryInfo);
					onCountryChange?.(countryInfo);
				}

				console.error("Error parsing phone number:", error);
				onChange?.(e);
				if (!autoAddedBrazil) {
					setDisplayFlag("");
					setCountryData(undefined);
					onCountryChange?.(undefined);
				}
			}
		};

		const hasValue = value && value.trim().length > 0;
		const displayValue = masked && value ? "•".repeat(value.length) : value;

		const inputClasses = cn(
			"relative flex h-9 items-center gap-2 rounded-md border border-input bg-transparent pl-3 text-base shadow-sm transition-colors [interpolate-size:allow-keywords] disabled:cursor-not-allowed disabled:opacity-50 has-[input:focus]:outline-none has-[input:focus]:ring-1 has-[input:focus]:ring-ring md:text-sm",
			inline && "w-full rounded-l-none",
			className,
		);

		return (
			<div className={inputClasses}>
				{!inline && hasValue && (
					<div className="h-4 w-4 shrink-0 rounded-full">
						{displayFlag ? (
							<CircleFlag countryCode={displayFlag} height={16} />
						) : (
							<GlobeIcon size={16} />
						)}
					</div>
				)}
				<input
					ref={ref}
					value={displayValue}
					onChange={handlePhoneChange}
					placeholder={placeholder || "Enter number"}
					type={masked ? "password" : "tel"}
					autoComplete="tel"
					name="phone"
					disabled={masked}
					className={cn(
						"flex h-9 w-full border-none bg-transparent p-0 py-1 text-base leading-none outline-none transition-colors [interpolate-size:allow-keywords] placeholder:text-muted-foreground md:text-sm",
						className,
					)}
					{...props}
				/>
				{!masked && (
					<PencilLine className="absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
				)}
			</div>
		);
	},
);

PhoneInput.displayName = "PhoneInput";
