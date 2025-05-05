// src/services/authService.ts
import { APP_CONFIG } from "../config/constants";

// Definizione dei tipi
export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserData {
  idOperatore: number;
  uuid: string;
  operatore: string;
  email: string;
  profilo: string;
  livello: number;
  stato: string;
  note: string;
  ultimaLogin: string;
  dataCreazione: string;
  ultimaModifica: string;
}

export interface LoginResponse {
  message: string;
  operatore: UserData;
  token: string;
}

export interface VerifyResponse {
  message: string;
  operatore: UserData;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  status?: string;
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${APP_CONFIG.API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Errore di autenticazione");
    }

    // Salva token nel localStorage
    localStorage.setItem(APP_CONFIG.AUTH_TOKEN_KEY, data.token);

    return data as LoginResponse;
  },

  logout: (): void => {
    localStorage.removeItem(APP_CONFIG.AUTH_TOKEN_KEY);
  },

  getToken: (): string | null => {
    return localStorage.getItem(APP_CONFIG.AUTH_TOKEN_KEY);
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem(APP_CONFIG.AUTH_TOKEN_KEY);
    return !!token;
  },

  verifyToken: async (): Promise<VerifyResponse> => {
    const token = localStorage.getItem(APP_CONFIG.AUTH_TOKEN_KEY);

    if (!token) {
      throw new Error("Token non trovato");
    }

    const response = await fetch(`${APP_CONFIG.API_BASE_URL}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Token non valido");
    }

    return data as VerifyResponse;
  },

  // Metodi per il reset della password
  requestPasswordReset: async (email: string): Promise<ApiResponse<null>> => {
    const response = await fetch(
      `${APP_CONFIG.API_BASE_URL}/auth/request-reset`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Errore nella richiesta di reset della password"
      );
    }

    return data as ApiResponse<null>;
  },

  validateResetToken: async (token: string): Promise<ApiResponse<null>> => {
    const response = await fetch(
      `${APP_CONFIG.API_BASE_URL}/auth/validate-reset-token/${token}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Token non valido o scaduto");
    }

    return data as ApiResponse<null>;
  },

  confirmPasswordReset: async (
    token: string,
    newPassword: string
  ): Promise<ApiResponse<null>> => {
    const response = await fetch(
      `${APP_CONFIG.API_BASE_URL}/auth/reset-password`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ token, newPassword }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Errore durante il reset della password");
    }

    return data as ApiResponse<null>;
  },
};
