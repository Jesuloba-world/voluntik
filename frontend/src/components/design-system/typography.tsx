import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function Typography() {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="text-coral">Typography System</CardTitle>
				<CardDescription>
					Consistent typography that reflects our community-focused,
					approachable brand.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* Headings */}
				<div>
					<h3 className="text-lg font-semibold mb-4 text-foreground">
						Headings
					</h3>
					<div className="space-y-4">
						<div>
							<h1 className="text-4xl font-bold text-coral mb-2">
								Heading 1
							</h1>
							<p className="text-sm text-muted-foreground">
								text-4xl font-bold - Main page titles
							</p>
						</div>
						<div>
							<h2 className="text-3xl font-semibold text-foreground mb-2">
								Heading 2
							</h2>
							<p className="text-sm text-muted-foreground">
								text-3xl font-semibold - Section titles
							</p>
						</div>
						<div>
							<h3 className="text-2xl font-semibold text-foreground mb-2">
								Heading 3
							</h3>
							<p className="text-sm text-muted-foreground">
								text-2xl font-semibold - Subsection titles
							</p>
						</div>
						<div>
							<h4 className="text-xl font-medium text-foreground mb-2">
								Heading 4
							</h4>
							<p className="text-sm text-muted-foreground">
								text-xl font-medium - Card titles
							</p>
						</div>
					</div>
				</div>

				<Separator />

				{/* Body Text */}
				<div>
					<h3 className="text-lg font-semibold mb-4 text-foreground">
						Body Text
					</h3>
					<div className="space-y-4">
						<div>
							<p className="text-lg text-foreground mb-2">
								Large body text - Perfect for introductory
								paragraphs and important content.
							</p>
							<p className="text-sm text-muted-foreground">
								text-lg - Lead paragraphs
							</p>
						</div>
						<div>
							<p className="text-base text-foreground mb-2">
								Regular body text - The standard text size for
								most content, ensuring excellent readability
								across all devices.
							</p>
							<p className="text-sm text-muted-foreground">
								text-base - Default body text
							</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground mb-2">
								Small text - Used for captions, metadata, and
								secondary information.
							</p>
							<p className="text-xs text-muted-foreground">
								text-sm - Captions and metadata
							</p>
						</div>
					</div>
				</div>

				<Separator />

				{/* Special Text Styles */}
				<div>
					<h3 className="text-lg font-semibold mb-4 text-foreground">
						Special Styles
					</h3>
					<div className="space-y-4">
						<div>
							<p className="text-coral font-semibold mb-2">
								Primary accent text
							</p>
							<p className="text-sm text-muted-foreground">
								text-coral font-semibold - Call-to-action text
							</p>
						</div>
						<div>
							<p className="text-teal font-medium mb-2">
								Secondary accent text
							</p>
							<p className="text-sm text-muted-foreground">
								text-teal font-medium - Supporting highlights
							</p>
						</div>
						<div>
							<p className="text-muted-foreground italic mb-2">
								Muted italic text
							</p>
							<p className="text-sm text-muted-foreground">
								text-muted-foreground italic - Subtle emphasis
							</p>
						</div>
						<div>
							<code className="bg-muted px-2 py-1 rounded text-sm font-mono">
								Code text
							</code>
							<p className="text-sm text-muted-foreground mt-2">
								bg-muted px-2 py-1 rounded text-sm font-mono
							</p>
						</div>
					</div>
				</div>

				<Separator />

				{/* Links */}
				<div>
					<h3 className="text-lg font-semibold mb-4 text-foreground">
						Links
					</h3>
					<div className="space-y-2">
						<div>
							<a
								href="#"
								className="text-coral hover:text-coral/80 underline underline-offset-4"
							>
								Primary link style
							</a>
						</div>
						<div>
							<a
								href="#"
								className="text-teal hover:text-teal/80 underline underline-offset-4"
							>
								Secondary link style
							</a>
						</div>
						<div>
							<a
								href="#"
								className="text-foreground hover:text-coral underline underline-offset-4"
							>
								Subtle link style
							</a>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default Typography;
