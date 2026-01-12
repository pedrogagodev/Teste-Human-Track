import { Copy, Plus, Trash } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import type { Control, FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldError } from "@/components/ui/field";
import type { GASFormData } from "@/features/gas/schemas/new-gas";
import { BaselineLevelSelector } from "./BaselineLevelSelector";
import { GoalLevelsFields } from "./GoalLevelsFields";
import { GoalNameField } from "./GoalNameField";

interface GoalCardProps {
	goalIndex: number;
	control: Control<GASFormData>;
	errors?: FieldErrors<GASFormData>;
	onDuplicate: () => void;
	onDelete: () => void;
	onAutoFill: () => void;
	isLast?: boolean;
	onAddNew?: () => void;
	isAutofilling?: boolean;
	shouldAnimate?: boolean;
}

export function GoalCard({
	goalIndex,
	control,
	errors,
	onDuplicate,
	onDelete,
	onAutoFill,
	isLast = false,
	onAddNew,
	isAutofilling,
	shouldAnimate,
}: GoalCardProps) {
	const goalError = errors?.goals?.[goalIndex];
	const cardRef = useRef<HTMLDivElement>(null);

	return (
		<motion.div
			ref={cardRef}
			layout="position"
			animate={shouldAnimate ? { scale: [1, 1.02, 1] } : {}}
			transition={{ duration: 0.4, ease: "easeInOut" }}
			onAnimationStart={() => {
				if (shouldAnimate && cardRef.current) {
					cardRef.current.scrollIntoView({
						behavior: "smooth",
						block: "center",
					});
				}
			}}
		>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-4">
					<CardTitle className="text-base">Meta {goalIndex + 1}</CardTitle>
					<div className="space-x-2">
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={onDuplicate}
							className="gap-2 rounded-sm border border-border px-2 py-4 shadow-[0px_1px_2px_0px_#0000000D] hover:cursor-pointer"
						>
							<Copy className="size-4 text-muted-foreground" />
						</Button>
						{goalIndex > 0 && (
							<Button
								type="button"
								variant="destructive"
								size="sm"
								onClick={onDelete}
								className="gap-2 rounded-sm border border-destructive/40 px-2 py-4 shadow-[0px_1px_2px_0px_#0000000D] hover:cursor-pointer"
							>
								<Trash className="size-4 text-destructive" />
							</Button>
						)}
					</div>
				</CardHeader>
				<CardContent className="flex flex-col gap-6">
					<GoalNameField goalIndex={goalIndex} control={control} />

					<BaselineLevelSelector goalIndex={goalIndex} control={control} />

					<GoalLevelsFields
						goalIndex={goalIndex}
						control={control}
						onAutoFill={onAutoFill}
						isAutofilling={isAutofilling}
					/>

					{goalError && typeof goalError === "object" && (
						<FieldError errors={[goalError]} />
					)}

					{isLast && onAddNew && (
						<Button
							type="button"
							variant="outline"
							onClick={onAddNew}
							className="w-full gap-2 rounded-sm border border-dashed bg-transparent font-medium text-muted-foreground hover:cursor-pointer"
						>
							<Plus className="size-4" />
							<span className="mt-0.5">Nova meta</span>
						</Button>
					)}
				</CardContent>
			</Card>
		</motion.div>
	);
}
