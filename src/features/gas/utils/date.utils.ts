import { DAY_NAMES } from "./reminders.constants";

export function startOfDay(date: Date): Date {
	const result = new Date(date);
	result.setHours(0, 0, 0, 0);
	return result;
}

export function getDayOfWeekName(date: Date | undefined): string {
	if (!date) return "";
	const dayIndex = date.getDay();
	return DAY_NAMES[dayIndex] || "";
}

export function getDayOfMonth(date: Date | undefined): number | null {
	if (!date) return null;
	return date.getDate();
}
