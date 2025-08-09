"use client";

import { ColorPalette } from "@/components/design-system/color-palette";
import { Typography } from "@/components/design-system/typography";
import { ComponentShowcase } from "@/components/design-system/component-showcase";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, Palette, Type, Component } from "lucide-react";

export default function DesignSystemPage() {
	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<div className="border-b bg-card">
				<div className="container mx-auto px-4 py-8">
					<div className="flex items-center gap-3 mb-4">
						<div className="p-2 rounded-lg bg-coral/10">
							<Heart className="h-8 w-8 text-coral" />
						</div>
						<div>
							<h1 className="text-4xl font-bold text-coral">
								Community Heartbeat
							</h1>
							<p className="text-xl text-muted-foreground">
								Design System
							</p>
						</div>
					</div>
					<p className="text-lg text-foreground max-w-3xl">
						A warm, inclusive design system that reflects the
						passion, energy, and community spirit of volunteerism.
						Built with accessibility, consistency, and human
						connection in mind.
					</p>
					<div className="flex gap-2 mt-4">
						<Badge className="bg-coral text-white">v1.0.0</Badge>
						<Badge className="bg-teal text-charcoal">
							Shadcn/UI
						</Badge>
						<Badge className="bg-sunset text-charcoal">
							Tailwind CSS
						</Badge>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="container mx-auto px-4 py-8">
				<Tabs defaultValue="overview" className="w-full">
					<TabsList className="grid w-full grid-cols-4 mb-8">
						<TabsTrigger
							value="overview"
							className="data-[state=active]:bg-coral data-[state=active]:text-white"
						>
							<Heart className="h-4 w-4 mr-2" />
							Overview
						</TabsTrigger>
						<TabsTrigger
							value="colors"
							className="data-[state=active]:bg-teal data-[state=active]:text-charcoal"
						>
							<Palette className="h-4 w-4 mr-2" />
							Colors
						</TabsTrigger>
						<TabsTrigger
							value="typography"
							className="data-[state=active]:bg-sunset data-[state=active]:text-charcoal"
						>
							<Type className="h-4 w-4 mr-2" />
							Typography
						</TabsTrigger>
						<TabsTrigger
							value="components"
							className="data-[state=active]:bg-lavender data-[state=active]:text-charcoal"
						>
							<Component className="h-4 w-4 mr-2" />
							Components
						</TabsTrigger>
					</TabsList>

					<TabsContent value="overview">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<Card>
								<CardHeader>
									<CardTitle className="text-coral">
										Design Philosophy
									</CardTitle>
									<CardDescription>
										Our approach to creating meaningful
										volunteer experiences
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div>
										<h4 className="font-semibold text-foreground mb-2">
											🤝 Human-Centered
										</h4>
										<p className="text-muted-foreground">
											Every design decision prioritizes
											the volunteer experience and
											community connection.
										</p>
									</div>
									<div>
										<h4 className="font-semibold text-foreground mb-2">
											🌟 Accessible
										</h4>
										<p className="text-muted-foreground">
											Inclusive design that welcomes
											volunteers of all abilities and
											backgrounds.
										</p>
									</div>
									<div>
										<h4 className="font-semibold text-foreground mb-2">
											💝 Warm & Inviting
										</h4>
										<p className="text-muted-foreground">
											Colors and typography that feel
											approachable and inspire action.
										</p>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="text-coral">
										Color Meaning
									</CardTitle>
									<CardDescription>
										Each color tells part of our story
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex items-center gap-3">
										<div className="w-4 h-4 rounded bg-coral"></div>
										<div>
											<span className="font-medium text-foreground">
												Warm Coral
											</span>
											<p className="text-sm text-muted-foreground">
												Passion for helping others
											</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-4 h-4 rounded bg-teal"></div>
										<div>
											<span className="font-medium text-foreground">
												Deep Teal
											</span>
											<p className="text-sm text-muted-foreground">
												Growth and positive impact
											</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-4 h-4 rounded bg-sunset"></div>
										<div>
											<span className="font-medium text-foreground">
												Sunset Orange
											</span>
											<p className="text-sm text-muted-foreground">
												Energy and enthusiasm
											</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-4 h-4 rounded bg-lavender"></div>
										<div>
											<span className="font-medium text-foreground">
												Lavender Purple
											</span>
											<p className="text-sm text-muted-foreground">
												Calm professionalism
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="lg:col-span-2">
								<CardHeader>
									<CardTitle className="text-coral">
										Implementation Guidelines
									</CardTitle>
									<CardDescription>
										Best practices for using the Community
										Heartbeat design system
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<h4 className="font-semibold text-foreground mb-3">
												Do&apos;s
											</h4>
											<ul className="space-y-2 text-muted-foreground">
												<li>
													✅ Use Warm Coral for
													primary actions and CTAs
												</li>
												<li>
													✅ Maintain consistent
													spacing and typography
												</li>
												<li>
													✅ Ensure sufficient color
													contrast for accessibility
												</li>
												<li>
													✅ Use the design tokens
													from globals.css
												</li>
												<li>
													✅ Test components in both
													light and dark themes
												</li>
											</ul>
										</div>
										<div>
											<h4 className="font-semibold text-foreground mb-3">
												Don&apos;ts
											</h4>
											<ul className="space-y-2 text-muted-foreground">
												<li>
													❌ Don&apos;t use colors
													outside the defined palette
												</li>
												<li>
													❌ Don&apos;t override
													component styles without
													purpose
												</li>
												<li>
													❌ Don&apos;t use more than
													3 accent colors per page
												</li>
												<li>
													❌ Don&apos;t ignore
													responsive design principles
												</li>
												<li>
													❌ Don&apos;t sacrifice
													accessibility for aesthetics
												</li>
											</ul>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</TabsContent>

					<TabsContent value="colors">
						<ColorPalette />
					</TabsContent>

					<TabsContent value="typography">
						<Typography />
					</TabsContent>

					<TabsContent value="components">
						<ComponentShowcase />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
