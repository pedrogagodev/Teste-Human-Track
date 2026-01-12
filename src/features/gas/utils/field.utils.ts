export const isEmpty = (value: unknown): boolean => {
	if (value == null) return true;
	if (typeof value === "string") return value.trim().length === 0;
	return false;
};
