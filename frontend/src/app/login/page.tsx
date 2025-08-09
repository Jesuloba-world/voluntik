"use client";

import { useState } from "react";
import { useLoginMutation } from "@/lib/auth";
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
import { Heart } from "lucide-react";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const login = useLoginMutation();

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		login.mutate({ email, password });
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<Card className="shadow-lg">
					<CardHeader className="text-center space-y-4">
						<div className="flex justify-center">
							<div className="p-3 rounded-full bg-coral/10">
								<Heart className="h-8 w-8 text-coral" />
							</div>
						</div>
						<CardTitle className="text-3xl font-bold text-coral">
							Welcome Back
						</CardTitle>
						<CardDescription className="text-base">
							Sign in to continue your volunteer journey, or{" "}
							<Link
								href="/register"
								className="font-medium text-coral hover:text-coral/80 underline underline-offset-4"
							>
								join our community
							</Link>
						</CardDescription>
					</CardHeader>

					<CardContent>
						<form onSubmit={onSubmit} className="space-y-6">
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
									className="focus:ring-coral focus:border-coral"
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
									placeholder="Enter your password"
									className="focus:ring-coral focus:border-coral"
								/>
							</div>

							<Button
								type="submit"
								disabled={login.isPending}
								className="w-full bg-coral hover:bg-coral/90 text-white font-medium py-2.5"
							>
								{login.isPending ? "Signing in..." : "Sign in"}
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
