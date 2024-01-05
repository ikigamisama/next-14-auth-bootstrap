import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const font_inter = Inter({
	subsets: ["latin"],
	weight: ["300", "400", "600"],
});

interface HeaderProps {
	label: string;
}

export const Header = ({ label }: HeaderProps) => {
	return (
		<div className='w-full flex flex-col gap-y-4 items-center'>
			<h1 className={cn("text-3xl font-semibold", font_inter.className)}>
				🔐 Auth
			</h1>
			<p className='text-muted-foreground text-sm'>{label}</p>
		</div>
	);
};
