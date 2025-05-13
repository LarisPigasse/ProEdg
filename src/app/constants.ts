// src/config/constants.ts

export const APP_CONFIG = {
  // Informazioni app
  NAME: "EdgPro",
  NAME_FULL: "EdgProject Professional",
  VERSION: "1.0.0",
  COPYRIGHT: `© ${new Date().getFullYear()} Express Delivery`,
  COPYRIGHT_FULL: `© ${new Date().getFullYear()} Express Delivery. Tutti i diritti riservati.`,

  // URL di base
  API_BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",

  // Impostazioni autenticazione
  AUTH_TOKEN_KEY: "edgpro_auth_token",
  AUTH_REFRESH_TOKEN_KEY: "edgpro_refresh_token",

  // Impostazioni UI
  DEFAULT_THEME: "light",
  DEFAULT_LANGUAGE: "it",

  // Timeout sessione in minuti
  SESSION_TIMEOUT: 30,

  // Valori per form
  DEFAULT_PAGE_SIZE: 16,
  MAX_FILE_SIZE: 8 * 1024 * 1024, // 8MB

  // Brand e stile
  BRAND_COLORS: {
    PRIMARY: "#0ea5e9", // sky-500
    SECONDARY: "#0c4a6e", // sky-950
    ACCENT: "#6366f1", // indigo-500
    SUCCESS: "#22c55e", // green-500
    WARNING: "#f59e0b", // amber-500
    ERROR: "#ef4444", // red-500
  },
  ICON_PRO: "/IconEdgPro.png",
  ICON_APP: "/IconEdgApp.png",
  BRABD_LOGO: "/edg.png",
  BRABD_LOGO_REV: "/edg-rev.png",
};

// Costanti per i messaggi di notifica
export const MESSAGES = {
  // Errori
  ERROR: {
    GENERIC: "Si è verificato un errore. Riprova più tardi.",
    CONNECTION: "Errore di connessione. Verifica la tua connessione internet.",
    UNAUTHORIZED: "Non sei autorizzato ad accedere a questa risorsa.",
    NOT_FOUND: "La risorsa richiesta non è stata trovata.",
    VALIDATION: "Verifica i dati inseriti e riprova.",
  },

  // Successi
  SUCCESS: {
    SAVED: "Dati salvati con successo.",
    DELETED: "Elemento eliminato con successo.",
    UPDATED: "Dati aggiornati con successo.",
  },

  // Conferme
  CONFIRM: {
    DELETE: "Sei sicuro di voler eliminare questo elemento?",
    CANCEL:
      "Sei sicuro di voler annullare? Le modifiche non salvate andranno perse.",
    LOGOUT: "Sei sicuro di voler effettuare il logout?",
  },
};

// Costanti per le route principali
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  OPERATORI: "/operatori",
  TABELLE: "/tabelle",
  CONFIGURAZIONE: "/configurazione",
  SETUP: "/setup",
};

// Puoi definire altre costanti specifiche a seconda delle necessità
