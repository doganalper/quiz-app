"use client";

import { Input } from "@/components/ui/input";
import React from "react";

type Props = {
	onChange: (name: string | undefined) => void;
	onEnterPress: () => void;
};
function QuizName({ onChange, onEnterPress }: Props) {
	function validateValue(val: string) {
		return val && val.length >= 5 && val.length <= 50;
	}

	return (
		<div className="space-y-2">
			<h1 className="text-xl">Name your quiz.</h1>
			<Input
				autoFocus
				min={5}
				max={50}
				onKeyUp={(e) => {
					if (e.key === "Enter" && validateValue(e.currentTarget.value)) {
						onEnterPress();
					}
				}}
				onChange={(e) => {
					const val = e.target.value;
					if (validateValue(val)) {
						onChange(e.target.value);
					} else {
						onChange(undefined);
					}
				}}
			/>
		</div>
	);
}

export default QuizName;
