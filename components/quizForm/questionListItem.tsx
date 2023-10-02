import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { FormQuestion } from "@/components/quizForm/addQuestion";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type Props = {
	question: FormQuestion;
	onRemoveClick: () => void;
	onQuestionClick: (question: FormQuestion) => void;
};
function QuestionListItem({ question, onRemoveClick, onQuestionClick }: Props) {
	const answerLength = question.answers.length;
	const answersText = `Has ${answerLength} answer${
		answerLength > 1 ? "s" : ""
	},`;

	const correctAnswerCount = question.answers.filter(
		(answer) => answer.isCorrectAnswer,
	).length;
	const correctAnswerText = `${correctAnswerCount} of them ${
		correctAnswerCount > 1 ? "are" : "is"
	} correct.`;

	return (
		<Card
			className="cursor-pointer group transition-colors duration-300 hover:bg-zinc-300 hover:border-white"
			onClick={() => onQuestionClick(question)}
		>
			<CardHeader className="space-y-1">
				<CardTitle className="flex justify-between">
					<span>{question.question}</span>
					<Trash2
						className="hover:stroke-red-400 transition-colors"
						onClick={(e) => {
							e.stopPropagation();
							onRemoveClick();
						}}
						size={16}
					/>
				</CardTitle>
				<CardDescription className="group-hover:text-zinc-800 flex space-y-0.5">
					<span>
						{answersText} {correctAnswerText}
					</span>
				</CardDescription>
			</CardHeader>
		</Card>
	);
}

export default QuestionListItem;
