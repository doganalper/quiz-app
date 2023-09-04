import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { FormQuestion } from "@/app/create/createQuizForm/addQuestion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React from "react";
import AddAnswer from "@/app/create/createQuizForm/addAnswerForm";
import AnswerListItem from "@/app/create/createQuizForm/answerListItem";

type AddAnswerState = "closed" | "open";

type Props = {
	open: boolean;
	onOpenChange: (val: boolean) => void;
	onQuestionAdd: (val: FormQuestion) => void;
};
function AddQuestionDialog({ open, onOpenChange }: Props) {
	const [question, setQuestion] = React.useState<FormQuestion | null>();
	const [showAddAnswerSection, setShowAddAnswerSection] =
		React.useState<AddAnswerState>("closed");

	function changeFormData(key: keyof FormQuestion, value: any) {
		setQuestion((prev) => {
			prev = prev ?? ({} as FormQuestion);

			if (key === "answers") {
				const prevAnswers = prev.answers;

				if (Array.isArray(prevAnswers)) {
					prev.answers = [...prev.answers, value];
				} else {
					prev.answers = [value];
				}
				setShowAddAnswerSection("closed");
			} else {
				prev[key] = value;
			}

			console.log("[question prev]:", prev);

			return prev;
		});
	}

	function onDeleteHandler(idx: number): void {
		if (!question || !question?.answers || question.answers.length === 0)
			return;

		const copiedAnswers = structuredClone(question?.answers);
		copiedAnswers.splice(idx, 1);
		setQuestion((prev) => {
			if (prev && prev.answers && prev.answers.length > 0) {
				prev = {
					...prev,
					answers: copiedAnswers,
				};
				return prev;
			}
		});
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a question</DialogTitle>
				</DialogHeader>
				<div>
					<Label htmlFor="question">Your question</Label>
					<Input
						name="question"
						onChange={(e) => changeFormData("question", e.target.value)}
					/>
				</div>
				{question && question.answers?.length > 0 && (
					<div>
						<div className="divide-y">
							<Label>Answers</Label>
							{question.answers.map((answer, idx) => (
								<AnswerListItem
									answer={answer}
									key={answer.text}
									onDeleteClick={() => onDeleteHandler(idx)}
								/>
							))}
						</div>
					</div>
				)}
				{showAddAnswerSection === "open" && (
					<AddAnswer
						onAnswerAdd={(answer) => changeFormData("answers", answer)}
					/>
				)}
				<Button
					onClick={() => setShowAddAnswerSection("open")}
					className="w-full sm:w-1/3"
					disabled={showAddAnswerSection === "open"}
					variant="outline"
				>
					Add New Answer
				</Button>
			</DialogContent>
		</Dialog>
	);
}

export default AddQuestionDialog;
