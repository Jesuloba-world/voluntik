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
			<section className="relative overflow-hidden bg-gradient-to-br from-coral/10 via-background to-teal/10 py-20 px-4">
				<div className="max-w-6xl mx-auto text-center">
					<div className="flex justify-center mb-6">
						<div className="p-4 rounded-full bg-coral/20">
							<Heart className="h-12 w-12 text-coral" />
						</div>
					</div>
					<h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
						Make a <span className="text-coral">Difference</span> in
						Your <span className="text-teal">Community</span>
					</h1>
					<p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
						Connect with meaningful volunteer opportunities, track
						your impact, and be part of a community that cares.
						Every heartbeat counts.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							asChild
							size="lg"
							className="bg-coral hover:bg-coral/90 text-white"
						>
							<Link href="/register">
								Start Volunteering
								<ArrowRight className="ml-2 h-5 w-5" />
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
			<section className="py-20 px-4">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
							Why Choose{" "}
							<span className="text-coral">Voluntik</span>?
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Our platform makes volunteering accessible,
							rewarding, and impactful for everyone in the
							community.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<Card className="border-coral/20 hover:shadow-lg transition-shadow">
							<CardHeader>
								<div className="p-3 rounded-full bg-coral/10 w-fit">
									<Users className="h-6 w-6 text-coral" />
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

						<Card className="border-teal/20 hover:shadow-lg transition-shadow">
							<CardHeader>
								<div className="p-3 rounded-full bg-teal/10 w-fit">
									<Calendar className="h-6 w-6 text-teal" />
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

						<Card className="border-orange/20 hover:shadow-lg transition-shadow">
							<CardHeader>
								<div className="p-3 rounded-full bg-orange/10 w-fit">
									<Star className="h-6 w-6 text-orange" />
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
			<section className="py-20 px-4 bg-gradient-to-r from-coral/5 to-teal/5">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
						Ready to Make Your Mark?
					</h2>
					<p className="text-lg text-muted-foreground mb-8">
						Join thousands of volunteers who are already making a
						difference in their communities.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							asChild
							size="lg"
							className="bg-teal hover:bg-teal/90 text-white"
						>
							<Link href="/register">
								Get Started Today
								<Heart className="ml-2 h-5 w-5" />
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
			<section className="py-16 px-4">
				<div className="max-w-4xl mx-auto">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
						<div>
							<div className="text-3xl font-bold text-coral mb-2">
								1,000+
							</div>
							<div className="text-sm text-muted-foreground">
								Active Volunteers
							</div>
						</div>
						<div>
							<div className="text-3xl font-bold text-teal mb-2">
								500+
							</div>
							<div className="text-sm text-muted-foreground">
								Organizations
							</div>
						</div>
						<div>
							<div className="text-3xl font-bold text-orange mb-2">
								10,000+
							</div>
							<div className="text-sm text-muted-foreground">
								Hours Volunteered
							</div>
						</div>
						<div>
							<div className="text-3xl font-bold text-purple mb-2">
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
