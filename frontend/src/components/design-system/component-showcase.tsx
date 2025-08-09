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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Heart,
	Users,
	Calendar,
	MapPin,
	AlertCircle,
	CheckCircle,
} from "lucide-react";

export function ComponentShowcase() {
	return (
		<div className="space-y-8">
			{/* Buttons */}
			<Card>
				<CardHeader>
					<CardTitle className="text-coral">Buttons</CardTitle>
					<CardDescription>
						Interactive elements for user actions
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-wrap gap-4">
						<Button className="bg-coral hover:bg-coral/90">
							Primary Action
						</Button>
						<Button
							variant="secondary"
							className="bg-teal text-charcoal hover:bg-teal/90"
						>
							Secondary Action
						</Button>
						<Button
							variant="outline"
							className="border-coral text-coral hover:bg-coral hover:text-white"
						>
							Outline Button
						</Button>
						<Button
							variant="ghost"
							className="text-coral hover:bg-coral/10"
						>
							Ghost Button
						</Button>
						<Button variant="destructive">Destructive</Button>
						<Button disabled>Disabled</Button>
					</div>
				</CardContent>
			</Card>

			{/* Form Elements */}
			<Card>
				<CardHeader>
					<CardTitle className="text-coral">Form Elements</CardTitle>
					<CardDescription>
						Input components for user data collection
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email Address</Label>
							<Input
								id="email"
								type="email"
								placeholder="volunteer@example.com"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="name">Full Name</Label>
							<Input id="name" placeholder="Enter your name" />
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Badges */}
			<Card>
				<CardHeader>
					<CardTitle className="text-coral">Badges</CardTitle>
					<CardDescription>
						Status indicators and labels
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-wrap gap-2">
						<Badge className="bg-coral text-white">
							Active Volunteer
						</Badge>
						<Badge className="bg-teal text-charcoal">
							Community Leader
						</Badge>
						<Badge className="bg-sunset text-charcoal">
							New Member
						</Badge>
						<Badge className="bg-lavender text-charcoal">
							Verified
						</Badge>
						<Badge variant="secondary">Pending</Badge>
						<Badge variant="destructive">Inactive</Badge>
						<Badge
							variant="outline"
							className="border-coral text-coral"
						>
							Featured
						</Badge>
					</div>
				</CardContent>
			</Card>

			{/* Avatars */}
			<Card>
				<CardHeader>
					<CardTitle className="text-coral">Avatars</CardTitle>
					<CardDescription>
						User profile representations
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center gap-4">
						<Avatar className="h-16 w-16">
							<AvatarImage
								src="https://github.com/shadcn.png"
								alt="@shadcn"
							/>
							<AvatarFallback className="bg-coral text-white text-lg">
								JD
							</AvatarFallback>
						</Avatar>
						<Avatar className="h-12 w-12">
							<AvatarFallback className="bg-teal text-charcoal">
								SM
							</AvatarFallback>
						</Avatar>
						<Avatar className="h-10 w-10">
							<AvatarFallback className="bg-sunset text-charcoal">
								AL
							</AvatarFallback>
						</Avatar>
						<Avatar className="h-8 w-8">
							<AvatarFallback className="bg-lavender text-charcoal text-xs">
								MK
							</AvatarFallback>
						</Avatar>
					</div>
				</CardContent>
			</Card>

			{/* Alerts */}
			<Card>
				<CardHeader>
					<CardTitle className="text-coral">Alerts</CardTitle>
					<CardDescription>
						Important messages and notifications
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Alert className="border-coral bg-coral/5">
						<Heart className="h-4 w-4 text-coral" />
						<AlertTitle className="text-coral">
							Welcome to Voluntik!
						</AlertTitle>
						<AlertDescription>
							Thank you for joining our community of passionate
							volunteers.
						</AlertDescription>
					</Alert>

					<Alert className="border-green-500 bg-green-50">
						<CheckCircle className="h-4 w-4 text-green-600" />
						<AlertTitle className="text-green-800">
							Application Approved
						</AlertTitle>
						<AlertDescription className="text-green-700">
							Your volunteer application has been successfully
							approved.
						</AlertDescription>
					</Alert>

					<Alert className="border-yellow-500 bg-yellow-50">
						<AlertCircle className="h-4 w-4 text-yellow-600" />
						<AlertTitle className="text-yellow-800">
							Action Required
						</AlertTitle>
						<AlertDescription className="text-yellow-700">
							Please complete your profile to start volunteering.
						</AlertDescription>
					</Alert>

					<Alert variant="destructive">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>Error</AlertTitle>
						<AlertDescription>
							There was an error processing your request. Please
							try again.
						</AlertDescription>
					</Alert>
				</CardContent>
			</Card>

			{/* Tabs */}
			<Card>
				<CardHeader>
					<CardTitle className="text-coral">Tabs</CardTitle>
					<CardDescription>
						Organized content navigation
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="opportunities" className="w-full">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger
								value="opportunities"
								className="data-[state=active]:bg-coral data-[state=active]:text-white"
							>
								<Users className="h-4 w-4 mr-2" />
								Opportunities
							</TabsTrigger>
							<TabsTrigger
								value="events"
								className="data-[state=active]:bg-teal data-[state=active]:text-charcoal"
							>
								<Calendar className="h-4 w-4 mr-2" />
								Events
							</TabsTrigger>
							<TabsTrigger
								value="locations"
								className="data-[state=active]:bg-sunset data-[state=active]:text-charcoal"
							>
								<MapPin className="h-4 w-4 mr-2" />
								Locations
							</TabsTrigger>
						</TabsList>
						<TabsContent value="opportunities" className="mt-4">
							<p className="text-muted-foreground">
								Browse volunteer opportunities in your area and
								find the perfect match for your skills and
								interests.
							</p>
						</TabsContent>
						<TabsContent value="events" className="mt-4">
							<p className="text-muted-foreground">
								Discover upcoming community events and volunteer
								activities happening near you.
							</p>
						</TabsContent>
						<TabsContent value="locations" className="mt-4">
							<p className="text-muted-foreground">
								Explore volunteer locations and organizations in
								your community.
							</p>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>

			{/* Interactive Components */}
			<Card>
				<CardHeader>
					<CardTitle className="text-coral">
						Interactive Components
					</CardTitle>
					<CardDescription>
						Dialogs, dropdowns, and other interactive elements
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex gap-4">
						<Dialog>
							<DialogTrigger asChild>
								<Button className="bg-coral hover:bg-coral/90">
									Open Dialog
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle className="text-coral">
										Join Our Community
									</DialogTitle>
									<DialogDescription>
										Ready to make a difference? Sign up to
										start volunteering today.
									</DialogDescription>
								</DialogHeader>
								<div className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="dialog-email">
											Email
										</Label>
										<Input
											id="dialog-email"
											placeholder="your@email.com"
										/>
									</div>
									<Button className="w-full bg-coral hover:bg-coral/90">
										Sign Up
									</Button>
								</div>
							</DialogContent>
						</Dialog>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									className="border-teal text-teal hover:bg-teal hover:text-charcoal"
								>
									User Menu
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>
									My Account
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Profile</DropdownMenuItem>
								<DropdownMenuItem>
									My Opportunities
								</DropdownMenuItem>
								<DropdownMenuItem>Settings</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="text-destructive">
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export default ComponentShowcase;
