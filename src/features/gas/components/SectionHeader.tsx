import type { ReactNode } from "react";

interface SectionHeaderProps {
	title: string;
	description: string;
	children?: ReactNode;
}

export function SectionHeader({
	title,
	description,
	children,
}: SectionHeaderProps) {
	return (
		<div className="flex flex-col gap-2">
			<h2 className="font-semibold text-sm">{title}</h2>
			<p className="text-xs/relaxed">{description}</p>
			{children}
		</div>
	);
}
