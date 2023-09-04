import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
	onChange: (date: Date | undefined) => void;
};
function ExpiresAt({ onChange }: Props) {
	const [popoverOpen, setPopoverOpen] = React.useState(false);
	const [pickedValue, setPickedValue] = React.useState<Date>(
		new Date(),
	);

	React.useEffect(() => {
		setPopoverOpen(false);
		onChange(pickedValue);
	}, [onChange, pickedValue]);

	return (
		<div className="space-y-2 text-center">
			<h1 className="text-xl">
				Until when do you want to people to participate?
			</h1>
			<Popover open={popoverOpen}>
				<PopoverTrigger asChild>
					<Button
						variant={"outline"}
						className={cn(
							"w-[240px] pl-3 text-left font-normal",
							!pickedValue && "text-muted-foreground",
						)}
						onClick={() => setPopoverOpen(true)}
					>
						{format(pickedValue!, "PPP")}
						<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						onSelect={(value) => setPickedValue(value!)}
						disabled={(date) => date < new Date()}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}

export default ExpiresAt;
