import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const font_inter = Inter({
	subsets: ["latin"],
	weight: ["300", "400", "600"],
});

export default async function Home() {
	return (
		<main className='flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-500 to-slate-900'>
			<div className='space-y-6 text-center'>
				<h1
					className={cn(
						"text-6xl font-semibold text-white drop-shadow-md",
						font_inter.className,
					)}>
					Auth
				</h1>
				<p className='text-white text-lg'>A simple authentication service</p>
				<div>
					<LoginButton>
						<Button variant='secondary' size='lg'>
							Sign In
						</Button>
					</LoginButton>
				</div>
			</div>
		</main>
	);
}
