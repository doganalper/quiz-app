"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { FormAnswer } from "@/components/quizForm/addQuestion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { PlusIcon } from "lucide-react";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

type Props = {
	onAnswerAdd: (answer: FormAnswer) => void;
};
const HOVER_DELAY = 100;
function AddAnswer({ onAnswerAdd }: Props) {
	const [answer, setAnswer] = React.useState<FormAnswer>();

	function changeAnswer(key: keyof FormAnswer, value: any) {
		setAnswer((prev) =>
			prev ? { ...prev, [key]: value } : ({ [key]: value } as FormAnswer),
		);
	}

	function onBtnClick() {
		if (!answer || !answer.text) return;

		onAnswerAdd(answer);
	}

	return (
		<div className="flex flex-col w-full">
			<div className="flex items-center space-x-2.5">
				<HoverCard openDelay={HOVER_DELAY} closeDelay={HOVER_DELAY}>
					<HoverCardTrigger>
						<Checkbox
							onCheckedChange={(val) =>
								changeAnswer("isCorrectAnswer", val)
							}
						/>
					</HoverCardTrigger>
					<HoverCardContent className="py-1 px-2 border-black">
						Set this answer as correct one.
					</HoverCardContent>
				</HoverCard>
				<Input
					placeholder="Answer"
					onChange={(e) => changeAnswer("text", e.target.value)}
				/>
				<HoverCard openDelay={HOVER_DELAY} closeDelay={HOVER_DELAY}>
					<HoverCardTrigger>
						<Button
							variant="ghost"
							size="icon"
							onClick={onBtnClick}
							className="group transition-colors hover:bg-green-400"
						>
							<PlusIcon
								size={20}
								className="transition-colors group-hover:stroke-white"
							/>
						</Button>
					</HoverCardTrigger>
					<HoverCardContent className="py-1 px-2 border-black w-fit">
						Add this answer.
					</HoverCardContent>
				</HoverCard>
			</div>
		</div>
	);
}

export default AddAnswer;
