"use client";

import Link from "next/link";

export default function Home() {
	return (
		<main className="min-h-screen bg-background">
			<div className="mx-auto max-w-4xl px-6 py-20">
				<div className="text-center mb-16">
					<h1 className="text-6xl font-bold text-primary mb-6">
						Voluntik
					</h1>
					<p className="text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
						Empowering small nonprofits with intuitive volunteer
						management that brings communities together
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-6 mb-12">
					<div className="hover:scale-105 transition-transform duration-300 border border-border bg-card text-card-foreground rounded-xl shadow-sm">
						<div className="p-8 text-center">
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<div className="w-8 h-8 bg-primary rounded-full"></div>
							</div>
							<h3 className="text-xl font-semibold mb-3">
								Simple Setup
							</h3>
							<p className="text-foreground/70 text-sm leading-relaxed">
								Get started in minutes with our streamlined
								onboarding process
							</p>
						</div>
					</div>

					<div className="hover:scale-105 transition-transform duration-300 border border-border bg-card text-card-foreground rounded-xl shadow-sm">
						<div className="p-8 text-center">
							<div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<div className="w-8 h-8 bg-secondary rounded-full"></div>
							</div>
							<h3 className="text-xl font-semibold mb-3">
								Smart Matching
							</h3>
							<p className="text-foreground/70 text-sm leading-relaxed">
								Connect volunteers with opportunities that match
								their skills and passion
							</p>
						</div>
					</div>

					<div className="hover:scale-105 transition-transform duration-300 border border-border bg-card text-card-foreground rounded-xl shadow-sm">
						<div className="p-8 text-center">
							<div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<div className="w-8 h-8 bg-success rounded-full"></div>
							</div>
							<h3 className="text-xl font-semibold mb-3">
								Real Impact
							</h3>
							<p className="text-foreground/70 text-sm leading-relaxed">
								Track and celebrate the meaningful difference
								your volunteers make
							</p>
						</div>
					</div>
				</div>

				<div className="border border-border bg-card text-card-foreground rounded-xl shadow-sm">
					<div className="p-12 text-center bg-primary/5 rounded-xl">
						<h2 className="text-2xl font-semibold mb-6">
							Ready to get started?
						</h2>
						<p className="text-foreground/70 mb-8 max-w-md mx-auto">
							Join thousands of nonprofits already using Voluntik
							to make a difference
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
							<Link
								href="/register"
								className="inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg bg-primary text-primary-foreground shadow-sm hover:opacity-90 transition"
							>
								Get Started Free
							</Link>
							<Link
								href="/login"
								className="inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg border-2 border-border hover:bg-foreground/5 transition"
							>
								Sign In
							</Link>
						</div>
						<div className="mt-8 pt-6 border-t border-foreground/10">
							<Link
								href="/me"
								className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-md bg-success/15 text-success hover:bg-success/20 transition"
							>
								View Profile Demo
							</Link>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
