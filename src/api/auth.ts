// src/api/auth.ts
export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: IUser;
}

const API_URL = 'http://localhost:5000/api/auth'; // backend URL

// Register
export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Registration failed');
  }

  return res.json();
}

// Login
export async function loginUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Login failed');
  }

  return res.json();
}

// Get current logged-in user
export async function getCurrentUser(): Promise<{ user: IUser | null }> {
  const res = await fetch(`${API_URL}/me`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) return { user: null };

  return res.json();
}

// Logout
export async function logoutUser(): Promise<void> {
  await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}
