"use client";

import type { Question, Quiz } from "@prisma/client";
import React from "react";

import ExpiresAt from "@/app/create/createQuizForm/expiresAt";
import QuizName from "@/app/create/createQuizForm/quizName";
import AddQuestion from "@/app/create/createQuizForm/addQuestion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type FormData = Omit<
	Quiz & {
		questions: Question[];
	},
	"id" | "users" | "createdAt"
>;

type Props = {};
const screenCount = 4;
function CreateForm({}: Props) {
	const [screenIdx, setScreenIdx] = React.useState(0);
	const [formData, setFormData] = React.useState<FormData | null>();
	const [isNextButtonActive, setIsNextButtonActive] = React.useState(false);
	const [showNextButton, setShowNextButton] = React.useState(true);

	function changeFormData(key: keyof FormData, value: any) {
		setFormData((prev) => {
			if (prev) {
				prev[key] = value;
			} else {
				prev = {} as FormData;
				prev[key] = value;
			}
			setIsNextButtonActive(!!prev[key]);

			return prev;
		});
	}

	function changeSreen(): void {
		setScreenIdx((prev) => {
			const nextVal = prev + 1;
			if (nextVal === 2) {
				setShowNextButton(false);
			}
			return nextVal;
		});
	}

	let formComponent = (
		<QuizName
			onChange={(val) => changeFormData("title", val)}
			onEnterPress={changeSreen}
		/>
	);

	switch (screenIdx) {
		case 1:
			formComponent = (
				<ExpiresAt onChange={(val) => changeFormData("expiresAt", val)} />
			);
			break;
		case 2:
			formComponent = (
				<AddQuestion onChange={(val) => changeFormData("questions", val)} />
			);
			break;
	}

	return (
		<div className="flex flex-col space-y-6 w-[380px]">
			{formComponent}
			{showNextButton && (
				<Button disabled={!isNextButtonActive} onClick={changeSreen}>
					Next
				</Button>
			)}
			<div className="flex justify-around">
				{Array.from({ length: screenCount }, (_, i) => i).map((val) => (
					<div
						key={val}
						className={cn("w-1.5 h-1.5 rounded-full cursor-pointer", {
							"bg-gray-500": screenIdx !== val,
							"bg-gray-800": screenIdx === val,
						})}
					></div>
				))}
			</div>
		</div>
	);
}

export default CreateForm;
