import { useMemo } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { debounce } from "../debounce";
import { saveDraft } from "./draftStorage";

export function useDraftSync<T extends FieldValues>(form: UseFormReturn<T>) {
	const saveDebounced = useMemo(() => debounce(saveDraft<T>, 400), []);

	useMemo(() => {
		const sub = form.watch((values) => {
			saveDebounced(values as T);
		});

		return () => sub.unsubscribe();
	}, [form.watch, saveDebounced]);
}
