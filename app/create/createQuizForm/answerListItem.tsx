import type { FormAnswer } from "@/app/create/createQuizForm/addQuestion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
	answer: FormAnswer;
	onDeleteClick: () => void;
};
function AnswerListItem({ answer, onDeleteClick }: Props) {
	return (
		<div className={cn("flex justify-between items-center py-1", {})}>
			<div className="space-x-3 flex items-center">
				<Checkbox disabled checked={answer.isCorrectAnswer} />
				<span className="font-semibold">{answer.text}</span>
			</div>
			<Button
				variant="ghost"
				size="icon"
				onClick={onDeleteClick}
				className="transition-colors group hover:bg-red-400"
			>
				<Trash2
					size={20}
					className="transition-colors group-hover:stroke-white"
				/>
			</Button>
		</div>
	);
}

export default AnswerListItem;
