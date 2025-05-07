# Gestione dello Stato con Redux - EDG-ProEdg

*Ultimo aggiornamento: [DATA]*

## Introduzione

Questo documento descrive l'architettura e l'implementazione della gestione dello stato nell'applicazione EDG-ProEdg utilizzando Redux Toolkit. La gestione centralizzata dello stato permette di mantenere un flusso di dati prevedibile e semplifica la condivisione dei dati tra componenti.

## Architettura Redux

### Overview

L'applicazione utilizza Redux Toolkit, un insieme di strumenti ufficiali che semplificano l'uso di Redux attraverso:
- Riduzione del boilerplate
- Gestione semplificata delle azioni e dei reducer
- Gestione immutabile dello stato con Immer
- Configurazione semplificata del middleware

### Struttura delle Cartelle

```
src/
└── store/
    ├── index.ts                # Configurazione store Redux
    ├── rootReducer.ts          # Combinazione dei reducer
    ├── hooks.ts                # Hook tipizzati
    └── slices/                 # Slice Redux per funzionalità
        ├── authSlice.ts        # Gestione autenticazione
        ├── operatoriSlice.ts   # Gestione operatori
        └── uiSlice.ts          # Gestione UI
```

### Configurazione dello Store

File: `src/store/index.ts`

```typescript
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignora azioni non serializzabili in ambiente di sviluppo
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Root Reducer

File: `src/store/rootReducer.ts`

```typescript
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import operatoriReducer from './slices/operatoriSlice';
import uiReducer from './slices/uiSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  operatori: operatoriReducer,
  ui: uiReducer,
});

export default rootReducer;
```

### Hook Tipizzati

File: `src/store/hooks.ts`

```typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// Hook tipizzati per evitare di ripetere le definizioni di tipo
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

---

## Slice Redux

### Auth Slice

File: `src/store/slices/authSlice.ts`

#### Interfacce

```typescript
// Definizione dell'interfaccia per l'utente
export interface User {
  idOperatore?: number;
  uuid?: string;
  operatore?: string;
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
```

#### Stato Iniziale

```typescript
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};
```

#### Slice e Reducer

```typescript
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
```

#### Utilizzo nel Componente

```typescript
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login, logout } from '../../store/slices/authSlice';

// Per accedere allo stato
const { isAuthenticated, user } = useAppSelector((state) => state.auth);

// Per inviare azioni
const dispatch = useAppDispatch();

// Login
dispatch(login({
  user: userData,
  token: "jwt_token_here"
}));

// Logout
dispatch(logout());
```

---

### Operatori Slice

File: `src/store/slices/operatoriSlice.ts`

#### Interfacce

```typescript
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

export interface OperatoriState {
  operatori: Operatore[];
  loading: boolean;
  error: string | null;
  selectedOperatore: Operatore | null;
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface FetchOperatoriParams {
  pageIndex: number;
  pageSize: number;
  sort?: {
    field: string;
    direction: 'ASC' | 'DESC';
  };
  query?: Record<string, any>;
}

export interface FetchOperatoriResult {
  items: Operatore[];
  totalItems: number;
  totalPages: number;
  pageIndex: number;
}
```

#### Stato Iniziale

```typescript
const initialState: OperatoriState = {
  operatori: [],
  loading: false,
  error: null,
  selectedOperatore: null,
  totalItems: 0,
  totalPages: 0,
  currentPage: 0
};
```

#### Thunk Actions

```typescript
// Azione asincrona per recuperare operatori filtrati
export const fetchOperatori = createAsyncThunk(
  'operatori/fetchOperatori',
  async (params: FetchOperatoriParams, { rejectWithValue }) => {
    try {
      const response = await apiService.post<FetchOperatoriResult>(
        '/operatori/filter',
        params
      );
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Errore sconosciuto');
    }
  }
);

// Altre azioni asincrone per ottenere dettagli, creare, aggiornare e eliminare operatori
// ...
```

#### Slice e Reducer

```typescript
const operatoriSlice = createSlice({
  name: 'operatori',
  initialState,
  reducers: {
    selectOperatore: (state, action: PayloadAction<Operatore | null>) => {
      state.selectedOperatore = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // fetchOperatori
    builder.addCase(fetchOperatori.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOperatori.fulfilled, (state, action) => {
      state.loading = false;
      state.operatori = action.payload.items;
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.pageIndex;
    });
    builder.addCase(fetchOperatori.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Gestione di altri casi per le altre azioni asincrone
    // ...
  },
});

export const { selectOperatore, clearErrors } = operatoriSlice.actions;
export default operatoriSlice.reducer;
```

#### Utilizzo nel Componente

```typescript
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchOperatori, selectOperatore } from '../../store/slices/operatoriSlice';

// Per accedere allo stato
const { 
  operatori, 
  loading, 
  error, 
  totalItems, 
  totalPages, 
  currentPage 
} = useAppSelector((state) => state.operatori);

// Per inviare azioni
const dispatch = useAppDispatch();

// Recupero operatori
useEffect(() => {
  dispatch(fetchOperatori({
    pageIndex: 0,
    pageSize: 10,
    sort: { field: 'operatore', direction: 'ASC' }
  }));
}, [dispatch]);

// Seleziona un operatore
const handleSelectOperatore = (operatore: Operatore) => {
  dispatch(selectOperatore(operatore));
};
```

---

### UI Slice

File: `src/store/slices/uiSlice.ts`

Lo slice UI gestisce lo stato generale dell'interfaccia utente, come le sidebar, le notifiche e altri elementi dell'UI.

#### Interfacce

```typescript
export interface UIState {
  sidebarOpen: boolean;
  activeModule: string | null;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  autoClose?: boolean;
  duration?: number;
}
```

#### Stato Iniziale

```typescript
const initialState: UIState = {
  sidebarOpen: true,
  activeModule: null,
  notifications: []
};
```

#### Slice e Reducer

```typescript
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setActiveModule: (state, action: PayloadAction<string | null>) => {
      state.activeModule = action.payload;
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const id = Date.now().toString();
      state.notifications.push({
        id,
        ...action.payload
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    }
  }
});

export const { 
  toggleSidebar, 
  setActiveModule, 
  addNotification, 
  removeNotification 
} = uiSlice.actions;

export default uiSlice.reducer;
```

#### Utilizzo nel Componente

```typescript
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { 
  toggleSidebar, 
  setActiveModule, 
  addNotification 
} from '../../store/slices/uiSlice';

// Per accedere allo stato
const { sidebarOpen, activeModule, notifications } = useAppSelector((state) => state.ui);

// Per inviare azioni
const dispatch = useAppDispatch();

// Toggle sidebar
const handleToggleSidebar = () => {
  dispatch(toggleSidebar());
};

// Imposta modulo attivo
useEffect(() => {
  dispatch(setActiveModule('dashboard'));
}, [dispatch]);

// Mostra notifica
const showSuccessMessage = () => {
  dispatch(addNotification({
    type: 'success',
    message: 'Operazione completata con successo',
    autoClose: true,
    duration: 3000
  }));
};
```

---

## Integrazione con API

### Thunk Actions

Le operazioni asincrone (chiamate API) vengono gestite utilizzando `createAsyncThunk` di Redux Toolkit, che semplifica la gestione degli stati di caricamento, successo ed errore.

```typescript
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/apiService';

export const fetchData = createAsyncThunk(
  'slice/fetchData',
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiService.get('/endpoint');
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Errore sconosciuto');
    }
  }
);
```

### Gestione degli Stati Asincroni

Nei reducer, gli stati delle operazioni asincrone vengono gestiti con `extraReducers`:

```typescript
extraReducers: (builder) => {
  // Pending: operazione in corso
  builder.addCase(fetchData.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  
  // Fulfilled: operazione completata con successo
  builder.addCase(fetchData.fulfilled, (state, action) => {
    state.loading = false;
    state.data = action.payload;
  });
  
  // Rejected: operazione fallita
  builder.addCase(fetchData.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });
}
```

---

## Flusso dei Dati Redux

### Flusso per Operazioni Sincrone

1. Un componente chiama un'azione Redux (`dispatch(action())`)
2. Il reducer processa l'azione e aggiorna lo stato
3. I componenti che utilizzano `useAppSelector` ricevono il nuovo stato

### Flusso per Operazioni Asincrone

1. Un componente dispatcha un'azione thunk (`dispatch(fetchData())`)
2. L'azione thunk dispatcha automaticamente un'azione pending
3. Il reducer gestisce l'azione pending (imposta loading a true)
4. La richiesta API viene eseguita
5. Se la richiesta ha successo, viene dispatchata un'azione fulfilled
6. Se la richiesta fallisce, viene dispatchata un'azione rejected
7. Il reducer aggiorna lo stato in base al risultato

---

## Best Practices

### Organizzazione del Codice

1. **Slice per funzionalità**: Ogni funzionalità principale ha il proprio slice
2. **Tipizzazione**: Utilizzare TypeScript per definire interfacce chiare
3. **Nomi descrittivi**: Usare nomi chiari per azioni e reducer

### Gestione dello Stato

1. **Immutabilità**: Non modificare lo stato direttamente
2. **Normalizzazione**: Per dati complessi, normalizzarli usando oggetti con ID come chiavi
3. **Selettori**: Utilizzare selettori per accedere allo stato in modo prevedibile

### Debugging

1. **Redux DevTools**: Utilizzare Redux DevTools per ispezionare stato e azioni
2. **Logging**: In development, utilizzare il middleware di logging Redux

---

## Riferimenti

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [TypeScript Redux Guide](https://react-redux.js.org/using-react-redux/usage-with-typescript)
- [Normalizzazione](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape)
