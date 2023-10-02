import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { FormQuestion } from "@/components/quizForm/addQuestion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React from "react";
import AddAnswer from "@/components/quizForm/addAnswerForm";
import AnswerListItem from "@/components/quizForm/answerListItem";

type AddAnswerState = "closed" | "open";
export type QuestionFormMethod = "add" | "edit"

type Props = {
	open: boolean;
	onOpenChange: (val: boolean) => void;
	onQuestionFormSubmit: (method: QuestionFormMethod, val: FormQuestion) => void;
	editQuestion: FormQuestion | null;
};
function AddQuestionDialog({
	open,
	onOpenChange,
	onQuestionFormSubmit,
	editQuestion,
}: Props) {
	const [question, setQuestion] = React.useState<FormQuestion>();
	const [showAddAnswerSection, setShowAddAnswerSection] =
		React.useState<AddAnswerState>("closed");
	const [isCreateBtnDisabled, setIsCreateBtnDisabled] = React.useState(true);

	React.useEffect(() => {
		if (editQuestion) {
			setQuestion(editQuestion);
		}
	}, [editQuestion]);

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

			checkQuestionDisablity(prev);

			return prev;
		});
	}

	async function onDeleteHandler(idx: number): Promise<void> {
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

				checkQuestionDisablity(prev);
				return prev;
			}
		});
	}

	function checkQuestionDisablity(question: FormQuestion) {
		let isValid = false;
		if (!question) {
			isValid = true;
		}

		if (question && !!question.question) {
			isValid = true;
		}

		if ((question?.answers || []).length !== 0) {
			isValid = false;
		}

		if (question?.question === "" || question?.question.trim() === "") {
			isValid = true;
		}

		setIsCreateBtnDisabled(isValid);
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{editQuestion ? "Edit" : "Create a"} question
					</DialogTitle>
				</DialogHeader>
				<div>
					<Label htmlFor="question">Your question</Label>
					<Input
						defaultValue={question?.question}
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
				<div className="flex flex-col sm:flex-row justify-between">
					<Button
						onClick={() => setShowAddAnswerSection("open")}
						className="w-full sm:w-1/3"
						disabled={showAddAnswerSection === "open"}
						variant="outline"
					>
						Add New Answer
					</Button>
					<Button
						onClick={() =>
							onQuestionFormSubmit(editQuestion ? "edit" : "add", question!)
						}
						className="w-full sm:w-1/3"
						disabled={isCreateBtnDisabled}
					>
						{editQuestion ? "Edit" : "Create"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default AddQuestionDialog;
