import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

function ensureDate(date: Date | string | undefined): Date | undefined {
	if (!date) return undefined;
	if (date instanceof Date) return date;
	const parsed = new Date(date);
	return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function formatDate(date: Date | string | undefined) {
	const normalizedDate = ensureDate(date);
	if (!normalizedDate) {
		return "";
	}
	return normalizedDate.toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
}

function parseDate(value: string): Date | undefined {
	const parts = value.split("/");
	if (parts.length === 3) {
		const day = Number.parseInt(parts[0], 10);
		const month = Number.parseInt(parts[1], 10) - 1;
		const yearStr = parts[2];
		const year = Number.parseInt(yearStr, 10);

		if (yearStr.length !== 4) {
			return undefined;
		}

		if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
			const date = new Date(year, month, day);
			if (!isNaN(date.getTime())) {
				return date;
			}
		}
	}
	return undefined;
}

function isValidDate(date: Date | undefined) {
	if (!date) {
		return false;
	}
	return !isNaN(date.getTime());
}

function startOfDay(date: Date): Date {
	const result = new Date(date);
	result.setHours(0, 0, 0, 0);
	return result;
}

interface DatePickerProps {
	id: string;
	value?: Date | string;
	onChange?: (date: Date | undefined) => void;
	onBlur?: () => void;
	placeholder?: string;
	minDate?: Date;
	disabled?: boolean;
	"aria-invalid"?: boolean;
	name?: string;
}

export function DatePicker({
	id,
	value,
	onChange,
	onBlur,
	placeholder = "Selecione uma data",
	minDate,
	disabled,
	"aria-invalid": ariaInvalid,
	name,
}: DatePickerProps) {
	const [open, setOpen] = React.useState(false);
	const [month, setMonth] = React.useState<Date | undefined>(
		ensureDate(value) ?? minDate,
	);
	const [inputValue, setInputValue] = React.useState(formatDate(value));
	const [isFocused, setIsFocused] = React.useState(false);

	React.useEffect(() => {
		if (!isFocused) {
			setInputValue(formatDate(value));
		}
		setMonth(ensureDate(value) ?? minDate);
	}, [value, minDate, isFocused]);

	const handleCalendarSelect = (selectedDate: Date | undefined) => {
		setInputValue(formatDate(selectedDate));
		onChange?.(selectedDate);
		setOpen(false);
	};

	const handleInputBlur = () => {
		setIsFocused(false);
		const parsedDate = parseDate(inputValue);

		if (parsedDate && isValidDate(parsedDate)) {
			onChange?.(parsedDate);
		} else if (inputValue.trim() === "") {
			onChange?.(undefined);
		}

		onBlur?.();
	};

	return (
		<div className="relative flex">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger
					render={
						<Button
							id={`${id}-picker`}
							variant="ghost"
							className="absolute top-1/2 left-2 size-6 -translate-y-1/2 hover:cursor-pointer"
							disabled={disabled}
							type="button"
						/>
					}
				>
					<CalendarIcon
						className={cn(
							"size-3.5 transition-colors",
							!value ? "text-muted-foreground" : "text-foreground",
						)}
					/>
					<span className="sr-only">Selecionar data</span>
				</PopoverTrigger>
				<PopoverContent
					className="w-auto overflow-hidden p-0"
					align="start"
					alignOffset={-8}
					sideOffset={10}
				>
					<Calendar
						mode="single"
						selected={ensureDate(value)}
						captionLayout="dropdown"
						month={month}
						onMonthChange={setMonth}
						disabled={minDate ? { before: startOfDay(minDate) } : undefined}
						onSelect={handleCalendarSelect}
					/>
				</PopoverContent>
			</Popover>
			<Input
				id={id}
				name={name}
				value={inputValue}
				placeholder={placeholder}
				className={cn("bg-background pt-2.5 pl-8")}
				disabled={disabled}
				aria-invalid={ariaInvalid}
				onFocus={() => setIsFocused(true)}
				onChange={(e) => {
					setInputValue(e.target.value);
				}}
				onBlur={handleInputBlur}
				onKeyDown={(e) => {
					if (e.key === "ArrowDown") {
						e.preventDefault();
						setOpen(true);
					}
				}}
			/>
		</div>
	);
}
