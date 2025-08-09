const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface LoginData {
	email: string;
	password: string;
}

export interface RegisterData {
	email: string;
	password: string;
}

export interface AuthResponse {
	token?: string;
	message?: string;
}

export interface UserInfo {
	user_id: string;
	role: string;
}

export async function loginUser(data: LoginData): Promise<AuthResponse> {
	const response = await fetch(`${API_BASE}/auth/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("Login failed");
	}

	return response.json();
}

export async function registerUser(data: RegisterData): Promise<AuthResponse> {
	const response = await fetch(`${API_BASE}/auth/register`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("Registration failed");
	}

	return response.json();
}

export async function logoutUser(): Promise<void> {
	const response = await fetch(`${API_BASE}/auth/logout`, {
		method: "POST",
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Logout failed");
	}
}

export async function getCurrentUser(): Promise<UserInfo> {
	const response = await fetch(`${API_BASE}/session/me`, {
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Failed to get user info");
	}

	return response.json();
}

export async function refreshToken(): Promise<AuthResponse> {
	const response = await fetch(`${API_BASE}/session/refresh`, {
		method: "POST",
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Token refresh failed");
	}

	return response.json();
}

export function getGoogleLoginUrl(): string {
	return `${API_BASE}/auth/google`;
}
