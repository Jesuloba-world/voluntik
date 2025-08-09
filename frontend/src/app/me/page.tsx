"use client";

import Link from "next/link";

export default function NotFound() {
	return (
		<main className="min-h-screen bg-background flex items-center justify-center px-4">
			<div className="text-center max-w-lg w-full">
				<div className="mb-8">
					<div className="w-24 h-24 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-6">
						<div className="text-6xl font-bold text-warning">!</div>
					</div>
					<h1 className="text-6xl font-bold text-primary mb-4">
						404
					</h1>
					<h2 className="text-2xl font-semibold text-foreground mb-2">
						Page Not Found
					</h2>
					<p className="text-foreground/70 text-lg">
						The page you&apos;re looking for seems to have wandered
						off into the digital wilderness.
					</p>
				</div>

				<div className="border border-border bg-card text-card-foreground rounded-xl shadow-xl">
					<div className="p-8">
						<div className="space-y-4">
							<p className="text-foreground/80">
								Don&apos;t worry, it happens to the best of us.
								Let&apos;s get you back on track.
							</p>
							<div className="flex flex-col sm:flex-row gap-3 justify-center">
								<Link
									href="/"
									className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
								>
									Take Me Home
								</Link>
								<Link
									href="/login"
									className="inline-flex items-center justify-center h-12 px-6 rounded-lg border-2 border-border font-semibold hover:bg-foreground/5 transition"
								>
									Sign In
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
