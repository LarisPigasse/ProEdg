// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth";
import { operatoriReducer } from "../features/operatori";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    operatori: operatoriReducer,
    // Altri reducer...
  },
  // Resto della configurazione...
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// src/app/hooks.ts (basato su src/store/hooks.ts)
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
