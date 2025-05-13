// src/store/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import operatoriReducer from "./slices/operatoriSlice";
// Importa altri reducer se necessario

const rootReducer = combineReducers({
  auth: authReducer,
  operatori: operatoriReducer,
  // Aggiungi altri reducer qui
});

export default rootReducer;
