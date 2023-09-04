import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Quiz Your Friends",
	description: "Dare your friends with hard questions, winner gets it all!",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={[
					inter.className,
					"bg-purple-500/80 flex justify-center items-center min-h-screen",
				].join(" ")}
			>
				{children}
			</body>
		</html>
	);
}
