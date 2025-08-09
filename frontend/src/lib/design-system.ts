import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Community Heartbeat Color Palette
 * These constants provide easy access to our design system colors
 */
export const colors = {
	// Primary Colors
	coral: {
		DEFAULT: "rgb(255 107 107)", // #FF6B6B
		light: "rgb(255 107 107 / 0.1)",
		dark: "rgb(255 107 107 / 0.9)",
	},
	teal: {
		DEFAULT: "rgb(78 205 196)", // #4ECDC4
		light: "rgb(78 205 196 / 0.1)",
		dark: "rgb(78 205 196 / 0.9)",
	},
	sunset: {
		DEFAULT: "rgb(255 230 109)", // #FFE66D
		light: "rgb(255 230 109 / 0.1)",
		dark: "rgb(255 230 109 / 0.9)",
	},
	lavender: {
		DEFAULT: "rgb(168 230 207)", // #A8E6CF
		light: "rgb(168 230 207 / 0.1)",
		dark: "rgb(168 230 207 / 0.9)",
	},

	// Neutral Colors
	charcoal: "rgb(44 62 80)", // #2C3E50
	cream: "rgb(254 254 254)", // #FEFEFE
	softGray: "rgb(236 240 241)", // #ECF0F1
	slateBlue: "rgb(52 73 94)", // #34495E

	// Status Colors
	success: "rgb(46 204 113)", // #2ECC71
	warning: "rgb(243 156 18)", // #F39C12
	error: "rgb(231 76 60)", // #E74C3C
	info: "rgb(52 152 219)", // #3498DB
} as const;

/**
 * Typography scale following our design system
 */
export const typography = {
	// Font sizes
	sizes: {
		xs: "0.75rem", // 12px
		sm: "0.875rem", // 14px
		base: "1rem", // 16px
		lg: "1.125rem", // 18px
		xl: "1.25rem", // 20px
		"2xl": "1.5rem", // 24px
		"3xl": "1.875rem", // 30px
		"4xl": "2.25rem", // 36px
	},

	// Font weights
	weights: {
		normal: "400",
		medium: "500",
		semibold: "600",
		bold: "700",
	},

	// Line heights
	lineHeights: {
		tight: "1.25",
		normal: "1.5",
		relaxed: "1.75",
	},
} as const;

/**
 * Spacing scale for consistent layout
 */
export const spacing = {
	xs: "0.25rem", // 4px
	sm: "0.5rem", // 8px
	md: "1rem", // 16px
	lg: "1.5rem", // 24px
	xl: "2rem", // 32px
	"2xl": "3rem", // 48px
	"3xl": "4rem", // 64px
} as const;

/**
 * Border radius values
 */
export const borderRadius = {
	sm: "0.375rem", // 6px
	md: "0.5rem", // 8px
	lg: "0.75rem", // 12px
	xl: "1rem", // 16px
	full: "9999px",
} as const;

/**
 * Shadow definitions for depth and elevation
 */
export const shadows = {
	sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
	md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
	lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
	xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
} as const;

/**
 * Animation durations and easing functions
 */
export const animations = {
	durations: {
		fast: "150ms",
		normal: "300ms",
		slow: "500ms",
	},

	easings: {
		easeIn: "cubic-bezier(0.4, 0, 1, 1)",
		easeOut: "cubic-bezier(0, 0, 0.2, 1)",
		easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
	},
} as const;

/**
 * Breakpoints for responsive design
 */
export const breakpoints = {
	sm: "640px",
	md: "768px",
	lg: "1024px",
	xl: "1280px",
	"2xl": "1536px",
} as const;

/**
 * Component variant helpers
 */
export const variants = {
	button: {
		primary: "bg-coral hover:bg-coral/90 text-white",
		secondary: "bg-teal hover:bg-teal/90 text-charcoal",
		accent: "bg-sunset hover:bg-sunset/90 text-charcoal",
		outline: "border-coral text-coral hover:bg-coral hover:text-white",
		ghost: "text-coral hover:bg-coral/10",
	},

	badge: {
		primary: "bg-coral text-white",
		secondary: "bg-teal text-charcoal",
		accent: "bg-sunset text-charcoal",
		success: "bg-success text-white",
		warning: "bg-warning text-white",
		error: "bg-error text-white",
	},

	alert: {
		info: "border-coral bg-coral/5 text-coral",
		success: "border-success bg-success/5 text-success",
		warning: "border-warning bg-warning/5 text-warning",
		error: "border-error bg-error/5 text-error",
	},
} as const;

/**
 * Accessibility helpers
 */
export const a11y = {
	// Screen reader only class
	srOnly: "sr-only",

	// Focus visible styles
	focusVisible:
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2",

	// High contrast mode support
	highContrast: "contrast-more:border-2 contrast-more:border-current",
} as const;

/**
 * Utility functions for common design system operations
 */
export const utils = {
	/**
	 * Get a color with opacity
	 */
	withOpacity: (color: string, opacity: number) => {
		return `${color} / ${opacity}`;
	},

	/**
	 * Generate responsive classes
	 */
	responsive: (base: string, variants: Record<string, string>) => {
		const classes = [base];
		Object.entries(variants).forEach(([breakpoint, value]) => {
			classes.push(`${breakpoint}:${value}`);
		});
		return classes.join(" ");
	},

	/**
	 * Create hover and focus states
	 */
	interactive: (base: string, hover?: string, focus?: string) => {
		const classes = [base];
		if (hover) classes.push(`hover:${hover}`);
		if (focus) classes.push(`focus:${focus}`);
		return classes.join(" ");
	},
} as const;

export type ColorKey = keyof typeof colors;
export type TypographySize = keyof typeof typography.sizes;
export type SpacingKey = keyof typeof spacing;
export type BorderRadiusKey = keyof typeof borderRadius;
