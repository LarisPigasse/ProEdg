# Documentazione Servizi Frontend EDG-ProEdg

*Ultimo aggiornamento: [DATA]*

Questo documento fornisce la documentazione completa dei servizi frontend utilizzati in EDG-ProEdg. Serve come punto di riferimento per gli sviluppatori che lavorano sul frontend dell'applicazione.

## Panoramica dei Servizi

Il frontend utilizza una serie di servizi per interagire con l'API backend, gestire lo stato dell'applicazione e fornire funzionalità comuni. I principali servizi sono:

- **authService**: Gestione dell'autenticazione
- **apiService**: Servizio base per le richieste API
- **[altri servizi specifici...]**

---

## authService

`authService` gestisce tutte le operazioni di autenticazione e autorizzazione.

### Definizione dei tipi

```typescript
// LoginRequest: Parametri per la richiesta di login
export interface LoginRequest {
  email: string;
  password: string;
}

// UserData: Dati dell'utente autenticato
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

// LoginResponse: Risposta alla richiesta di login
export interface LoginResponse {
  message: string;
  operatore: UserData;
  token: string;
}

// VerifyResponse: Risposta alla verifica del token
export interface VerifyResponse {
  message: string;
  operatore: UserData;
}

// ChangePasswordRequest: Parametri per il cambio password
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// ApiResponse: Risposta generica dall'API
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  status?: string;
}
```

### Metodi

#### `login(credentials: LoginRequest): Promise<LoginResponse>`

Autentica un utente con email e password.

**Parametri:**
- `credentials`: Oggetto contenente email e password dell'utente

**Ritorni:**
- Promise che risolve con i dati di risposta del login (token JWT e dati utente)

**Effetti collaterali:**
- Salva il token JWT nel localStorage con la chiave `APP_CONFIG.AUTH_TOKEN_KEY`

**Errori:**
- Lancia un errore se l'autenticazione fallisce

**Esempio:**
```typescript
try {
  const user = await authService.login({ 
    email: "mario@esempio.it", 
    password: "password123" 
  });
  console.log("Utente autenticato:", user.operatore.operatore);
} catch (error) {
  console.error("Errore di login:", error.message);
}
```

---

#### `logout(): void`

Esegue il logout dell'utente.

**Effetti collaterali:**
- Rimuove il token JWT dal localStorage

**Esempio:**
```typescript
authService.logout();
// L'utente è ora disconnesso
```

---

#### `getToken(): string | null`

Recupera il token JWT dal localStorage.

**Ritorni:**
- Il token JWT se presente, altrimenti `null`

**Esempio:**
```typescript
const token = authService.getToken();
if (token) {
  console.log("Token JWT disponibile");
} else {
  console.log("Nessun token JWT, utente non autenticato");
}
```

---

#### `isAuthenticated(): boolean`

Verifica se l'utente è autenticato.

**Ritorni:**
- `true` se è presente un token JWT nel localStorage, altrimenti `false`

**Esempio:**
```typescript
if (authService.isAuthenticated()) {
  console.log("Utente autenticato");
} else {
  console.log("Utente non autenticato");
}
```

---

#### `verifyToken(): Promise<VerifyResponse>`

Verifica la validità del token JWT con il backend.

**Ritorni:**
- Promise che risolve con i dati dell'utente se il token è valido

**Errori:**
- Lancia un errore se il token non è presente
- Lancia un errore se il token non è valido

**Esempio:**
```typescript
try {
  const response = await authService.verifyToken();
  console.log("Token valido, utente:", response.operatore.operatore);
} catch (error) {
  console.error("Token non valido:", error.message);
}
```

---

#### `changePassword(payload: ChangePasswordRequest): Promise<ApiResponse<null>>`

Cambia la password dell'utente autenticato.

**Parametri:**
- `payload`: Oggetto contenente la password attuale e la nuova password

**Ritorni:**
- Promise che risolve con un messaggio di conferma

**Errori:**
- Lancia un errore se il token non è presente
- Lancia un errore se la password attuale è errata
- Lancia un errore se la nuova password non rispetta i requisiti

**Esempio:**
```typescript
try {
  await authService.changePassword({
    currentPassword: "password123",
    newPassword: "nuovaPassword456"
  });
  console.log("Password aggiornata con successo");
} catch (error) {
  console.error("Errore nel cambio password:", error.message);
}
```

---

#### `requestPasswordReset(email: string): Promise<ApiResponse<null>>`

Richiede un reset della password per l'indirizzo email specificato.

**Parametri:**
- `email`: L'indirizzo email dell'utente

**Ritorni:**
- Promise che risolve con un messaggio di conferma

**Errori:**
- Lancia un errore se l'email non è valida o non esiste

**Esempio:**
```typescript
try {
  await authService.requestPasswordReset("mario@esempio.it");
  console.log("Email di reset inviata con successo");
} catch (error) {
  console.error("Errore nella richiesta di reset:", error.message);
}
```

---

#### `validateResetToken(token: string): Promise<ApiResponse<null>>`

Verifica la validità di un token di reset password.

**Parametri:**
- `token`: Il token di reset ricevuto via email

**Ritorni:**
- Promise che risolve con un messaggio di conferma se il token è valido

**Errori:**
- Lancia un errore se il token non è valido o è scaduto

**Esempio:**
```typescript
try {
  await authService.validateResetToken("token123abc");
  console.log("Token di reset valido");
} catch (error) {
  console.error("Token di reset non valido:", error.message);
}
```

---

#### `confirmPasswordReset(token: string, newPassword: string): Promise<ApiResponse<null>>`

Conferma il reset della password con una nuova password.

**Parametri:**
- `token`: Il token di reset ricevuto via email
- `newPassword`: La nuova password

**Ritorni:**
- Promise che risolve con un messaggio di conferma

**Errori:**
- Lancia un errore se il token non è valido o è scaduto
- Lancia un errore se la nuova password non rispetta i requisiti

**Esempio:**
```typescript
try {
  await authService.confirmPasswordReset("token123abc", "nuovaPassword456");
  console.log("Password reimpostata con successo");
} catch (error) {
  console.error("Errore nel reset della password:", error.message);
}
```

---

## apiService

`apiService` è un servizio di base per effettuare richieste all'API backend con gestione automatica dell'autenticazione e degli errori.

### Definizione dei tipi

```typescript
// ApiResponse: Risposta generica dall'API
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  status?: string;
}
```

### Metodi

#### `request<T>(url: string, options: RequestInit = {}): Promise<T>`

Effettua una richiesta HTTP generica all'API.

**Parametri:**
- `url`: URL dell'endpoint API
- `options`: Opzioni per la richiesta fetch (opzionale)

**Ritorni:**
- Promise che risolve con la risposta dell'API del tipo specificato

**Effetti collaterali:**
- Aggiunge automaticamente gli headers Content-Type e Authorization
- Reindirizza al login se riceve una risposta 401 (non autorizzato)

**Errori:**
- Lancia un errore se la richiesta fallisce

**Esempio:**
```typescript
try {
  const response = await apiService.request<UserData>("/operatori/1");
  console.log("Dati operatore:", response);
} catch (error) {
  console.error("Errore nella richiesta:", error.message);
}
```

---

#### `get<T>(url: string, options: RequestInit = {}): Promise<T>`

Effettua una richiesta HTTP GET.

**Parametri:**
- `url`: URL dell'endpoint API
- `options`: Opzioni per la richiesta fetch (opzionale)

**Ritorni:**
- Promise che risolve con la risposta dell'API del tipo specificato

**Esempio:**
```typescript
try {
  const operatori = await apiService.get<UserData[]>("/operatori");
  console.log("Lista operatori:", operatori);
} catch (error) {
  console.error("Errore nel recupero operatori:", error.message);
}
```

---

#### `post<T>(url: string, data: Record<string, unknown>, options: RequestInit = {}): Promise<T>`

Effettua una richiesta HTTP POST.

**Parametri:**
- `url`: URL dell'endpoint API
- `data`: Dati da inviare nel corpo della richiesta
- `options`: Opzioni per la richiesta fetch (opzionale)

**Ritorni:**
- Promise che risolve con la risposta dell'API del tipo specificato

**Esempio:**
```typescript
try {
  const nuovoOperatore = await apiService.post<UserData>("/operatori", {
    operatore: "Nuovo Operatore",
    email: "nuovo@esempio.it",
    password: "password123",
    profilo: "operatore",
    livello: 2,
    stato: "attivo",
    note: "Nuovo operatore creato"
  });
  console.log("Operatore creato:", nuovoOperatore);
} catch (error) {
  console.error("Errore nella creazione dell'operatore:", error.message);
}
```

---

#### `put<T>(url: string, data: Record<string, unknown>, options: RequestInit = {}): Promise<T>`

Effettua una richiesta HTTP PUT.

**Parametri:**
- `url`: URL dell'endpoint API
- `data`: Dati da inviare nel corpo della richiesta
- `options`: Opzioni per la richiesta fetch (opzionale)

**Ritorni:**
- Promise che risolve con la risposta dell'API del tipo specificato

**Esempio:**
```typescript
try {
  const operatoreAggiornato = await apiService.put<UserData>("/operatori/1", {
    operatore: "Operatore Aggiornato",
    email: "aggiornato@esempio.it",
    profilo: "supervisore",
    livello: 3,
    stato: "attivo",
    note: "Operatore aggiornato"
  });
  console.log("Operatore aggiornato:", operatoreAggiornato);
} catch (error) {
  console.error("Errore nell'aggiornamento dell'operatore:", error.message);
}
```

---

#### `delete<T>(url: string, options: RequestInit = {}): Promise<T>`

Effettua una richiesta HTTP DELETE.

**Parametri:**
- `url`: URL dell'endpoint API
- `options`: Opzioni per la richiesta fetch (opzionale)

**Ritorni:**
- Promise che risolve con la risposta dell'API del tipo specificato

**Esempio:**
```typescript
try {
  const risposta = await apiService.delete<{message: string}>("/operatori/1");
  console.log("Risposta:", risposta.message);
} catch (error) {
  console.error("Errore nella cancellazione dell'operatore:", error.message);
}
```

---

## Redux: authSlice

`authSlice` gestisce lo stato di autenticazione dell'applicazione tramite Redux Toolkit.

### Definizione dei tipi

```typescript
// User: Dati dell'utente autenticato
export interface User {
  idOperatore?: number;
  name?: string;
  email?: string;
  profilo?: string;
  livello?: number;
  stato?: string;
}

// AuthState: Stato dell'autenticazione
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

// LoginPayload: Payload per l'azione login
interface LoginPayload {
  user: User;
  token: string;
}
```

### Stato iniziale

```typescript
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};
```

### Actions

#### `login(payload: LoginPayload)`

Imposta lo stato di autenticazione a true e salva i dati dell'utente e il token.

**Parametri:**
- `payload`: Oggetto contenente i dati dell'utente e il token JWT

**Esempio:**
```typescript
dispatch(login({
  user: userData,
  token: "jwt_token_here"
}));
```

---

#### `logout()`

Resetta lo stato di autenticazione.

**Esempio:**
```typescript
dispatch(logout());
```

---

#### `updateUser(payload: Partial<User>)`

Aggiorna i dati dell'utente autenticato.

**Parametri:**
- `payload`: Oggetto parziale con i dati dell'utente da aggiornare

**Esempio:**
```typescript
dispatch(updateUser({
  name: "Nuovo Nome",
  email: "nuova.email@esempio.it"
}));
```

---

## Hooks

### useModal

`useModal` è un hook personalizzato per gestire lo stato delle modal.

#### Definizione

```typescript
const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
};
```

#### Utilizzo

```typescript
// All'interno di un componente
const { isOpen, openModal, closeModal, toggleModal } = useModal();

// Esempio di utilizzo
return (
  <>
    <button onClick={openModal}>Apri Modal</button>
    
    <Modal isOpen={isOpen} onClose={closeModal}>
      Contenuto della modal
    </Modal>
  </>
);
```

---

## Componenti UI comuni

### Modal

Componente UI per visualizzare contenuti in una finestra modale.

#### Props

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}
```

#### Utilizzo

```typescript
import Modal from "../components/ui/Modal";

// All'interno di un componente
const { isOpen, openModal, closeModal } = useModal();

return (
  <>
    <button onClick={openModal}>Apri Modal</button>
    
    <Modal 
      isOpen={isOpen} 
      onClose={closeModal}
      title="Titolo Modal"
      size="md"
    >
      <p>Contenuto della modal</p>
      <button onClick={closeModal}>Chiudi</button>
    </Modal>
  </>
);
```

---

### Input

Componente UI per input di testo.

#### Props

```typescript
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // Eventuali props aggiuntive
}
```

#### Utilizzo

```typescript
import Input from "../components/ui/Input";

// All'interno di un componente
const [value, setValue] = useState("");

return (
  <Input
    id="email"
    name="email"
    type="email"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Inserisci email"
    required
  />
);
```

---

### SubmitButton

Componente UI per pulsanti di submit con stato di caricamento.

#### Props

```typescript
interface SubmitButtonProps {
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
}
```

#### Utilizzo

```typescript
import SubmitButton from "../components/ui/SubmitButton";
import { Save } from "lucide-react";

// All'interno di un componente
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    // Operazione asincrona
    await someAsyncOperation();
  } finally {
    setLoading(false);
  }
};

return (
  <form onSubmit={handleSubmit}>
    {/* Altri campi del form */}
    <SubmitButton
      isLoading={loading}
      loadingText="Salvataggio in corso..."
      leftIcon={<Save className="h-4 w-4" />}
      fullWidth
    >
      Salva
    </SubmitButton>
  </form>
);
```

---

## Note sull'Utilizzo

### Gestione Autenticazione

Il flusso di autenticazione standard è:

1. L'utente inserisce credenziali nel componente `Login`
2. Il componente chiama `authService.login` con le credenziali
3. In caso di successo, il token viene salvato nel localStorage e si aggiorna lo stato Redux con `dispatch(login(...))`
4. Le richieste successive utilizzano `apiService` che aggiunge automaticamente il token
5. Il componente `AuthInitializer` verifica la validità del token all'avvio dell'applicazione

### Integrazione con il Backend

- Tutti i servizi frontend sono progettati per integrarsi con l'API backend descritta nella documentazione API
- I tipi di dati corrispondono alle risposte API del backend
- Gli errori del backend vengono gestiti e propagati appropriatamente

### Best Practices

- Utilizzare sempre i servizi centralizzati invece di implementare chiamate fetch dirette
- Gestire correttamente gli stati di loading e gli errori nelle UI
- Utilizzare TypeScript correttamente per garantire type safety
- Preferire componenti UI riutilizzabili come `Modal`, `Input` e `SubmitButton`
