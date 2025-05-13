// src/features/operatori/index.ts
export { default as OperatoriList } from "./OperatoriList";
export { default as OperatoreForm } from "./OperatoreForm";
export { operatoriService } from "./operatoriService";
export {
  default as operatoriReducer,
  fetchOperatori,
  createOperatore,
  updateOperatore,
  deleteOperatore,
  setSelectedOperatore,
} from "./operatoriSlice";
