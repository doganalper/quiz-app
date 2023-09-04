"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import AddQuestionDialog from "@/app/create/createQuizForm/addQuestionDialog";
import type { Answer, Question } from "@prisma/client";

export type FormAnswer = Omit<Answer, "id" | "questionId">
export type FormQuestion = Omit<Question, "id" | "quizId"> & {
	answers: FormAnswer[];
};

type Props = {
	onChange: (val: any) => void;
};
function AddQuestion({ onChange }: Props) {
	const [questions, setQuestions] = React.useState<FormQuestion[]>([]);
	const [showDialog, setShowDialog] = React.useState(false);

	if (questions.length === 0 && !showDialog) {
		return (
			<div className="flex flex-col space-y-1.5 items-center">
				<h2 className="text-xl">You don&apos;t have a question yet!</h2>
				<Button className="w-full" onClick={() => setShowDialog(true)}>
					Create First One
				</Button>
			</div>
		);
	}

	function addQuestion(question: FormQuestion) {
		setQuestions((prev) => {
			return [...prev, question];
		});
	}

	if (showDialog) {
		return (
			<AddQuestionDialog
				open={showDialog}
				onOpenChange={(val) => setShowDialog(val)}
				onQuestionAdd={(val) => addQuestion(val)}
			/>
		);
	}

	return <div></div>;
}

export default AddQuestion;
