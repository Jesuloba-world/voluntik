"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Heart, Users, Calendar, Star, ArrowRight } from "lucide-react";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="overflow-hidden relative px-4 py-20 bg-gradient-to-br from-coral/10 via-background to-teal/10">
				<div className="mx-auto max-w-6xl text-center">
					<div className="flex justify-center mb-6">
						<div className="p-4 rounded-full bg-coral/20">
							<Heart className="w-12 h-12 text-coral" />
						</div>
					</div>
					<h1 className="mb-6 text-5xl font-bold md:text-6xl text-foreground">
						Make a <span className="text-coral">Difference</span> in
						Your <span className="text-teal">Community</span>
					</h1>
					<p className="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground">
						Connect with meaningful volunteer opportunities, track
						your impact, and be part of a community that cares.
						Every heartbeat counts.
					</p>
					<div className="flex flex-col gap-4 justify-center sm:flex-row">
						<Button
							asChild
							size="lg"
							className="text-white bg-coral hover:bg-coral/90"
						>
							<Link href="/register">
								Start Volunteering
								<ArrowRight className="ml-2 w-5 h-5" />
							</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							size="lg"
							className="border-teal text-teal hover:bg-teal/10"
						>
							<Link href="/login">Sign In</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="px-4 py-20">
				<div className="mx-auto max-w-6xl">
					<div className="mb-16 text-center">
						<h2 className="mb-4 text-3xl font-bold md:text-4xl text-foreground">
							Why Choose{" "}
							<span className="text-coral">Voluntik</span>?
						</h2>
						<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
							Our platform makes volunteering accessible,
							rewarding, and impactful for everyone in the
							community.
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						<Card className="transition-shadow border-coral/20 hover:shadow-lg">
							<CardHeader>
								<div className="p-3 rounded-full bg-coral/10 w-fit">
									<Users className="w-6 h-6 text-coral" />
								</div>
								<CardTitle className="text-coral">
									Community Focused
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-base">
									Connect with local organizations and
									neighbors who share your passion for making
									a positive impact.
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="transition-shadow border-teal/20 hover:shadow-lg">
							<CardHeader>
								<div className="p-3 rounded-full bg-teal/10 w-fit">
									<Calendar className="w-6 h-6 text-teal" />
								</div>
								<CardTitle className="text-teal">
									Flexible Scheduling
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-base">
									Find opportunities that fit your schedule,
									from one-time events to ongoing commitments.
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="transition-shadow border-orange/20 hover:shadow-lg">
							<CardHeader>
								<div className="p-3 rounded-full bg-orange/10 w-fit">
									<Star className="w-6 h-6 text-orange" />
								</div>
								<CardTitle className="text-orange">
									Track Your Impact
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-base">
									See the difference you&apos;re making with
									detailed analytics and recognition for your
									contributions.
								</CardDescription>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="px-4 py-20 bg-gradient-to-r from-coral/5 to-teal/5">
				<div className="mx-auto max-w-4xl text-center">
					<h2 className="mb-6 text-3xl font-bold md:text-4xl text-foreground">
						Ready to Make Your Mark?
					</h2>
					<p className="mb-8 text-lg text-muted-foreground">
						Join thousands of volunteers who are already making a
						difference in their communities.
					</p>
					<div className="flex flex-col gap-4 justify-center sm:flex-row">
						<Button
							asChild
							size="lg"
							className="text-white bg-teal hover:bg-teal/90"
						>
							<Link href="/register">
								Get Started Today
								<Heart className="ml-2 w-5 h-5" />
							</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							size="lg"
							className="border-coral text-coral hover:bg-coral/10"
						>
							<Link href="/design-system">
								View Design System
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="px-4 py-16">
				<div className="mx-auto max-w-4xl">
					<div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
						<div>
							<div className="mb-2 text-3xl font-bold text-coral">
								1,000+
							</div>
							<div className="text-sm text-muted-foreground">
								Active Volunteers
							</div>
						</div>
						<div>
							<div className="mb-2 text-3xl font-bold text-teal">
								500+
							</div>
							<div className="text-sm text-muted-foreground">
								Organizations
							</div>
						</div>
						<div>
							<div className="mb-2 text-3xl font-bold text-orange">
								10,000+
							</div>
							<div className="text-sm text-muted-foreground">
								Hours Volunteered
							</div>
						</div>
						<div>
							<div className="mb-2 text-3xl font-bold text-purple">
								50+
							</div>
							<div className="text-sm text-muted-foreground">
								Cities Served
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
