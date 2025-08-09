"use client";

import { useState } from "react";
import { useRegisterMutation } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users } from "lucide-react";

export default function RegisterPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const register = useRegisterMutation();

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		register.mutate({ email, password });
	};

	const errorMsg = register.isError
		? register.error instanceof Error
			? register.error.message
			: "Registration failed"
		: null;

	return (
		<div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<Card className="shadow-lg">
					<CardHeader className="text-center space-y-4">
						<div className="flex justify-center">
							<div className="p-3 rounded-full bg-teal/10">
								<Users className="h-8 w-8 text-teal" />
							</div>
						</div>
						<CardTitle className="text-3xl font-bold text-teal">
							Join Our Community
						</CardTitle>
						<CardDescription className="text-base">
							Start making a difference today, or{" "}
							<Link
								href="/login"
								className="font-medium text-coral hover:text-coral/80 underline underline-offset-4"
							>
								sign in to your account
							</Link>
						</CardDescription>
					</CardHeader>

					<CardContent>
						<form onSubmit={onSubmit} className="space-y-6">
							<div className="space-y-2">
								<Label
									htmlFor="name"
									className="text-foreground font-medium"
								>
									Full Name
								</Label>
								<Input
									id="name"
									type="text"
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="Your full name"
									className="focus:ring-teal focus:border-teal"
								/>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="email"
									className="text-foreground font-medium"
								>
									Email address
								</Label>
								<Input
									id="email"
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="volunteer@example.com"
									className="focus:ring-teal focus:border-teal"
								/>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="password"
									className="text-foreground font-medium"
								>
									Password
								</Label>
								<Input
									id="password"
									type="password"
									required
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									placeholder="Create a secure password"
									className="focus:ring-teal focus:border-teal"
								/>
							</div>

							{errorMsg && (
								<div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
									<p className="text-sm text-destructive text-center">
										{errorMsg}
									</p>
								</div>
							)}

							<Button
								type="submit"
								disabled={register.isPending}
								className="w-full bg-teal hover:bg-teal/90 text-white font-medium py-2.5"
							>
								{register.isPending
									? "Creating account..."
									: "Create account"}
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
