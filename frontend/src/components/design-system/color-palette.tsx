import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface ColorSwatchProps {
	name: string;
	description: string;
	className: string;
	textClassName?: string;
}

function ColorSwatch({
	name,
	description,
	className,
	textClassName = "text-white",
}: ColorSwatchProps) {
	return (
		<div className={`p-4 rounded-lg ${className} ${textClassName}`}>
			<div className="font-semibold">{name}</div>
			<div className="text-sm opacity-90">{description}</div>
		</div>
	);
}

export function ColorPalette() {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="text-coral">
					Community Heartbeat Color Palette
				</CardTitle>
				<CardDescription>
					Our design system reflects the warmth, energy, and community
					spirit of volunteerism.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* Primary Colors */}
				<div>
					<h3 className="text-lg font-semibold mb-3 text-foreground">
						Primary Colors
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						<ColorSwatch
							name="Warm Coral"
							description="Passion & Connection"
							className="bg-coral"
							textClassName="text-white"
						/>
						<ColorSwatch
							name="Deep Teal"
							description="Growth & Impact"
							className="bg-teal"
							textClassName="text-charcoal"
						/>
						<ColorSwatch
							name="Sunset Orange"
							description="Energy & Enthusiasm"
							className="bg-sunset"
							textClassName="text-charcoal"
						/>
						<ColorSwatch
							name="Lavender Purple"
							description="Calm Professionalism"
							className="bg-lavender"
							textClassName="text-charcoal"
						/>
					</div>
				</div>

				{/* Status Colors */}
				<div>
					<h3 className="text-lg font-semibold mb-3 text-foreground">
						Status Colors
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						<ColorSwatch
							name="Success"
							description="Completed actions"
							className="bg-success"
							textClassName="text-white"
						/>
						<ColorSwatch
							name="Warning"
							description="Attention needed"
							className="bg-warning"
							textClassName="text-white"
						/>
						<ColorSwatch
							name="Destructive"
							description="Errors & deletion"
							className="bg-destructive"
							textClassName="text-white"
						/>
						<ColorSwatch
							name="Info"
							description="Information & tips"
							className="bg-blue-500"
							textClassName="text-white"
						/>
					</div>
				</div>

				{/* Usage Examples */}
				<div>
					<h3 className="text-lg font-semibold mb-3 text-foreground">
						Usage Examples
					</h3>
					<div className="flex flex-wrap gap-2">
						<Badge className="bg-coral text-white">
							Primary Action
						</Badge>
						<Badge className="bg-teal text-charcoal">
							Secondary Action
						</Badge>
						<Badge className="bg-sunset text-charcoal">
							Accent
						</Badge>
						<Badge className="bg-lavender text-charcoal">
							Supporting
						</Badge>
						<Badge variant="destructive">Error</Badge>
						<Badge className="bg-success text-white">Success</Badge>
						<Badge className="bg-warning text-white">Warning</Badge>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default ColorPalette;
