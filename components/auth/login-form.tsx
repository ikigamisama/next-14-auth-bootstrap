"use client";

import * as z from "zod";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {
	const searchParams = useSearchParams();
	const urlError =
		searchParams.get("error") === "OAuthAccountNotLinked"
			? "Email already in use with diffirent provider"
			: "";

	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
		setError("");
		setSuccess("");
		startTransition(() => {
			login(values, callbackUrl)
				.then((data) => {
					if (data?.error) {
						form.reset();
						setError(data.error);
					}

					if (data?.success) {
						form.reset();
						setSuccess(data.success);
					}

					if (data?.twoFactor) {
						setShowTwoFactor(true);
					}
				})
				.catch(() => setError("Something went wrong"));
		});
	};

	return (
		<CardWrapper
			headerLabel='Welcome Back'
			backButtonLabel="Don't have an account ?"
			backButtonHref='/auth/register'
			showSocial>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										placeholder='john.doe@example.com'
										type='email'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input {...field} disabled={isPending} type='password' />
								</FormControl>
								<Button
									size='sm'
									variant='link'
									asChild
									className='px-0 font-normal'>
									<Link href='/auth/reset'>Forgot password?</Link>
								</Button>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormError message={error || urlError} />
					<FormSuccess message={success} />

					<Button type='submit' disabled={isPending} className='w-full'>
						Login
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};