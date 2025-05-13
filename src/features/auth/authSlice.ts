// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definizione dell'interfaccia per l'utente
export interface User {
  idOperatore?: number;
  name?: string;
  email?: string;
  profilo?: string;
  livello?: number;
  stato?: string;
}

// Interfaccia per lo stato dell'autenticazione
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

// Interfaccia per il payload dell'azione login
interface LoginPayload {
  user: User;
  token: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Usiamo PayloadAction<LoginPayload> invece di any
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    // Usiamo PayloadAction<Partial<User>> invece di any
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
