import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
	return (
		<div className="flex flex-col space-y-4 items-center">
			<h2 className="text-xl text-center">
				Greetings, are you ready to <strong>sweat</strong> your friends?
				<br />
				With your hard questions ofc :)
			</h2>

			<Link href="/create">
				<Button>Lets Start</Button>
			</Link>
		</div>
	);
}
