export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
  appTheme?: string;
  appLang?: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
