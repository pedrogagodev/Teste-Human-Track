const KEY = "draft:goal:v1";

export function loadDraft() {
	const raw = sessionStorage.getItem(KEY);
	if (!raw) return undefined;

	try {
		const parsed = JSON.parse(raw);
		return parsed.data;
	} catch {
		return undefined;
	}
}

export function saveDraft<T>(data: T) {
	sessionStorage.setItem(
		KEY,
		JSON.stringify({
			data,
			updatedAt: Date.now(),
			version: 1,
		}),
	);
}

export function clearDraft() {
	sessionStorage.removeItem(KEY);
}
