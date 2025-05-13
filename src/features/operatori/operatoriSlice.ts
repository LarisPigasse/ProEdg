// src/store/slices/operatoriSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  operatoriService,
  Operatore,
  CreateOperatoreRequest,
  UpdateOperatoreRequest,
} from "../operatori/operatoriService";

// Definiamo lo stato per il reducer
interface OperatoriState {
  operatori: Operatore[];
  selectedOperatore: Operatore | null;
  loading: boolean;
  error: string | null;
}

// Stato iniziale
const initialState: OperatoriState = {
  operatori: [],
  selectedOperatore: null,
  loading: false,
  error: null,
};

// Thunk actions per operazioni asincrone
export const fetchOperatori = createAsyncThunk(
  "operatori/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await operatoriService.getAllOperatori();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Errore sconosciuto"
      );
    }
  }
);

export const fetchOperatore = createAsyncThunk(
  "operatori/fetchOne",
  async (id: number | string, { rejectWithValue }) => {
    try {
      return await operatoriService.getOperatore(id);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Errore sconosciuto"
      );
    }
  }
);

export const createOperatore = createAsyncThunk(
  "operatori/create",
  async (operatore: CreateOperatoreRequest, { rejectWithValue }) => {
    try {
      return await operatoriService.createOperatore(operatore);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Errore sconosciuto"
      );
    }
  }
);

export const updateOperatore = createAsyncThunk(
  "operatori/update",
  async (
    {
      id,
      operatore,
    }: { id: number | string; operatore: UpdateOperatoreRequest },
    { rejectWithValue }
  ) => {
    try {
      return await operatoriService.updateOperatore(id, operatore);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Errore sconosciuto"
      );
    }
  }
);

export const deleteOperatore = createAsyncThunk(
  "operatori/delete",
  async (id: number | string, { rejectWithValue }) => {
    try {
      await operatoriService.deleteOperatore(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Errore sconosciuto"
      );
    }
  }
);

// Slice Redux
const operatoriSlice = createSlice({
  name: "operatori",
  initialState,
  reducers: {
    setSelectedOperatore: (state, action: PayloadAction<Operatore | null>) => {
      state.selectedOperatore = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchOperatori
    builder.addCase(fetchOperatori.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOperatori.fulfilled, (state, action) => {
      state.loading = false;
      state.operatori = action.payload;
    });
    builder.addCase(fetchOperatori.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // fetchOperatore
    builder.addCase(fetchOperatore.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOperatore.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedOperatore = action.payload;
    });
    builder.addCase(fetchOperatore.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // createOperatore
    builder.addCase(createOperatore.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createOperatore.fulfilled, (state, action) => {
      state.loading = false;
      state.operatori.push(action.payload);
    });
    builder.addCase(createOperatore.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // updateOperatore
    builder.addCase(updateOperatore.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateOperatore.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.operatori.findIndex(
        (op) => op.idOperatore === action.payload.idOperatore
      );
      if (index !== -1) {
        state.operatori[index] = action.payload;
      }
      if (state.selectedOperatore?.idOperatore === action.payload.idOperatore) {
        state.selectedOperatore = action.payload;
      }
    });
    builder.addCase(updateOperatore.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // deleteOperatore
    builder.addCase(deleteOperatore.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteOperatore.fulfilled, (state, action) => {
      state.loading = false;
      state.operatori = state.operatori.filter((op) => {
        // Gestisce sia ID numerico che UUID string
        if (typeof action.payload === "number") {
          return op.idOperatore !== action.payload;
        } else {
          return op.uuid !== action.payload;
        }
      });
      if (
        state.selectedOperatore?.idOperatore === action.payload ||
        state.selectedOperatore?.uuid === action.payload
      ) {
        state.selectedOperatore = null;
      }
    });
    builder.addCase(deleteOperatore.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

// Esporta azioni e reducer
export const { setSelectedOperatore, clearError } = operatoriSlice.actions;
export default operatoriSlice.reducer;
