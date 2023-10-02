"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import AddQuestionDialog, {
	type QuestionFormMethod,
} from "@/components/quizForm/addQuestionDialog";
import type { Answer, Question } from "@prisma/client";
import QuestionListItem from "@/components/quizForm/questionListItem";
import { ScrollArea } from "@/components/ui/scroll-area";

export type FormAnswer = Omit<Answer, "id" | "questionId">;
export type FormQuestion = Omit<Question, "id" | "quizId"> & {
	answers: FormAnswer[];
};

function CreateQuestionButton({
	text,
	onClick,
}: {
	text: string;
	onClick: () => void;
}) {
	return (
		<Button
			className="w-full bg-green-500 hover:bg-green-600 transition-colors duration-300"
			onClick={onClick}
		>
			{text}
		</Button>
	);
}

type Props = {
	onChange: (val: any) => void;
};
function AddQuestion({ onChange }: Props) {
	const [questions, setQuestions] = React.useState<FormQuestion[]>([]);
	const [showDialog, setShowDialog] = React.useState(false);
	const [editQuestionIdx, setEditQuestionIdx] = React.useState<number | null>(
		null,
	);

	if (questions.length === 0 && !showDialog) {
		return (
			<div className="flex flex-col space-y-1.5 items-center">
				<h2 className="text-xl">You don&apos;t have a question yet!</h2>
				<CreateQuestionButton
					text="Create First One"
					onClick={() => setShowDialog(true)}
				/>
			</div>
		);
	}

	function onQuestionFormSubmit(
		method: QuestionFormMethod,
		question: FormQuestion,
	) {
		setQuestions((prev) => {
			if (method === "add") {
				prev = [...prev, question];
			}

			if (editQuestionIdx && method === "edit") {
				const copiedQuestions = structuredClone(prev);
				copiedQuestions[editQuestionIdx] = question;

				prev = copiedQuestions;
			}

			console.log("[prev]:", prev);

			onChange(prev);
			return prev;
		});
		setShowDialog(false);
	}

	if (showDialog) {
		return (
			<AddQuestionDialog
				open={showDialog}
				editQuestion={
					editQuestionIdx !== null ? questions[editQuestionIdx] : null
				}
				onOpenChange={(val) => setShowDialog(val)}
				onQuestionFormSubmit={onQuestionFormSubmit}
			/>
		);
	}

	function onQuestionClick(idx: number) {
		setEditQuestionIdx(idx);
		setShowDialog(true);
	}

	function onRemoveClick(idx: number) {
		setQuestions((prev) => {
			const copiedQuestions = structuredClone(prev);
			const filtered = copiedQuestions.filter((_, index) => index !== idx);

			onChange(filtered);

			return filtered;
		});
	}

	return (
		<div className="space-y-3">
			<ScrollArea>
				<div className="space-y-2 max-h-96">
					{questions.map((question, idx) => (
						<QuestionListItem
							question={question}
							onQuestionClick={() => onQuestionClick(idx)}
							onRemoveClick={() => {
								onRemoveClick(idx);
							}}
							key={`${question.question}-${crypto.randomUUID()}`}
						/>
					))}
				</div>
			</ScrollArea>
			<CreateQuestionButton
				text="Create Another"
				onClick={() => setShowDialog(true)}
			/>
		</div>
	);
}

export default AddQuestion;
