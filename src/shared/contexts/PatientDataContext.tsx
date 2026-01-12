import { createContext, useContext, useEffect, useState } from "react";

interface PatientDataContextValue {
	patientDataEnabled: boolean;
	togglePatientData: () => void;
}

const PatientDataContext = createContext<PatientDataContextValue | undefined>(
	undefined,
);

const STORAGE_KEY = "patient-data-visibility";

export function PatientDataProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [patientDataEnabled, setPatientDataEnabled] = useState(true);

	useEffect(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved !== null) {
			setPatientDataEnabled(saved === "true");
		}
	}, []);

	const togglePatientData = () => {
		setPatientDataEnabled((prev) => {
			const newValue = !prev;
			localStorage.setItem(STORAGE_KEY, String(newValue));
			return newValue;
		});
	};

	return (
		<PatientDataContext.Provider
			value={{ patientDataEnabled, togglePatientData }}
		>
			{children}
		</PatientDataContext.Provider>
	);
}

export function usePatientData() {
	const context = useContext(PatientDataContext);
	if (!context) {
		throw new Error("usePatientData must be used within PatientDataProvider");
	}
	return context;
}
