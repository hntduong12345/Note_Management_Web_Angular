export interface AuthResponse {
  status: string;
  jwtToken: string;
  mfaToken: string | null;
  userId: string;
  email: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface UserSession {
  id: string;
  email: string;
  token: string;
}
