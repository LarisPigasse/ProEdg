// src/services/operatoriService.ts
import { apiService } from "../../core/services/apiService";

// Definizione dei tipi
export interface Operatore {
  idOperatore: number;
  uuid: string;
  operatore: string;
  email: string;
  profilo: string;
  livello: number;
  stato: string;
  note: string;
  ultimaLogin: string | null;
  dataCreazione: string;
  ultimaModifica: string;
}

export interface CreateOperatoreRequest {
  operatore: string;
  email: string;
  password: string;
  profilo: string;
  livello: number;
  stato: string;
  note?: string;
}

export interface UpdateOperatoreRequest {
  operatore?: string;
  email?: string;
  profilo?: string;
  livello?: number;
  stato?: string;
  note?: string;
}

// Servizio per la gestione degli operatori
export const operatoriService = {
  // Ottieni tutti gli operatori
  getAllOperatori: async (): Promise<Operatore[]> => {
    return apiService.get<Operatore[]>("/operatori");
  },

  // Ottieni un operatore specifico per ID
  getOperatore: async (id: number | string): Promise<Operatore> => {
    return apiService.get<Operatore>(`/operatori/${id}`);
  },

  // Crea un nuovo operatore
  createOperatore: async (
    operatore: CreateOperatoreRequest
  ): Promise<Operatore> => {
    return apiService.post<Operatore>("/operatori", operatore);
  },

  // Aggiorna un operatore esistente
  updateOperatore: async (
    id: number | string,
    operatore: UpdateOperatoreRequest
  ): Promise<Operatore> => {
    return apiService.put<Operatore>(`/operatori/${id}`, operatore);
  },

  // Elimina un operatore
  deleteOperatore: async (
    id: number | string
  ): Promise<{ message: string }> => {
    return apiService.delete<{ message: string }>(`/operatori/${id}`);
  },
};
