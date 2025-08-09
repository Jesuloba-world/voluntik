import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// Types
export interface LoginData {
	email: string;
	password: string;
}

export interface RegisterData {
	email: string;
	password: string;
}

export interface User {
	user_id: string;
	role: string;
}

export interface AuthResponse {
	token: string;
	user: User;
}

// API Functions
export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("Login failed");
	}

	return response.json();
};

export const registerUser = async (
	data: RegisterData
): Promise<AuthResponse> => {
	const response = await fetch("/api/auth/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("Registration failed");
	}

	return response.json();
};

export const logoutUser = async (): Promise<void> => {
	const response = await fetch("/api/auth/logout", {
		method: "POST",
	});

	if (!response.ok) {
		throw new Error("Logout failed");
	}
};

export const getCurrentUser = async (): Promise<User> => {
	const response = await fetch("/api/auth/me");

	if (!response.ok) {
		throw new Error("Failed to get current user");
	}

	return response.json();
};

export const refreshToken = async (): Promise<{ token: string }> => {
	const response = await fetch("/api/auth/refresh", {
		method: "POST",
	});

	if (!response.ok) {
		throw new Error("Token refresh failed");
	}

	return response.json();
};

export const getGoogleLoginUrl = (): string => {
	return "/api/auth/google";
};

// React Query Hooks

export const useLoginMutation = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: loginUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["currentUser"] });
			router.push("/me");
		},
	});
};

export const useRegisterMutation = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: registerUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["currentUser"] });
			router.push("/me");
		},
	});
};

export const useLogoutMutation = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: logoutUser,
		onSuccess: () => {
			queryClient.removeQueries({ queryKey: ["currentUser"] });
			router.push("/");
		},
	});
};

export const useCurrentUser = () => {
	return useQuery({
		queryKey: ["currentUser"],
		queryFn: getCurrentUser,
		retry: false,
		staleTime: 5 * 60 * 1000,
	});
};

export const useRefreshToken = () => {
	return useMutation({
		mutationFn: refreshToken,
	});
};
