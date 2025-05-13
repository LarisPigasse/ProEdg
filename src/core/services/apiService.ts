// src/services/apiService.ts
import { APP_CONFIG } from "../../app/constants";
import { authService } from "../../features/auth/";

// Definizione dei tipi per le risposte API
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  status?: string;
}

// Funzione per fare richieste API autenticate
export const apiService = {
  request: async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    // Prepara l'URL completo
    const apiUrl = url.startsWith("http") ? url : `${APP_CONFIG.API_BASE_URL}${url}`;

    // Prepara le opzioni con gli headers predefiniti
    const token = authService.getToken();

    const defaultHeaders: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Aggiunge il token di autenticazione se disponibile
    if (token) {
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

    // Unisce gli headers predefiniti con quelli passati
    const mergedOptions: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {}),
      },
    };

    // Esegue la richiesta
    const response = await fetch(apiUrl, mergedOptions);

    // Se la risposta non è ok, gestisce l'errore
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({} as Record<string, unknown>));

      // Gestione speciale per errori di autenticazione
      if (response.status === 401) {
        // Rimuove il token e reindirizza al login
        authService.logout();
        window.location.href = "/login";
      }

      throw new Error((errorData as { message?: string }).message || `Errore ${response.status}`);
    }

    // Controlla se la risposta è vuota
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return (await response.json()) as T;
    }

    return (await response.text()) as unknown as T;
  },

  // Metodi helper per i vari tipi di richieste
  get: <T>(url: string, options: RequestInit = {}): Promise<T> => apiService.request<T>(url, { ...options, method: "GET" }),

  post: <T>(url: string, data: Record<string, unknown>, options: RequestInit = {}): Promise<T> =>
    apiService.request<T>(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: <T>(url: string, data: Record<string, unknown>, options: RequestInit = {}): Promise<T> =>
    apiService.request<T>(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: <T>(url: string, options: RequestInit = {}): Promise<T> => apiService.request<T>(url, { ...options, method: "DELETE" }),
};
