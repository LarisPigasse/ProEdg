# Endpoints di Autenticazione - EDG-ProEdg API

*Ultimo aggiornamento: [DATA]*

## Panoramica

Gli endpoint di autenticazione gestiscono tutte le operazioni relative all'autenticazione degli utenti, inclusi login, verifica del token, reset della password e cambio password.

Base URL: `http://localhost:3000/api` (ambiente di sviluppo)

## Indice
- [Login](#login)
- [Verifica Token](#verifica-token)
- [Richiesta Reset Password](#richiesta-reset-password)
- [Validazione Token Reset](#validazione-token-reset)
- [Reset Password](#reset-password)
- [Cambio Password](#cambio-password)

---

## Login

Autentica un utente e fornisce un token JWT.

### Richiesta

**Endpoint:** `POST /auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Esempio:**
```json
{
  "email": "mario@esempio.it",
  "password": "Password123!"
}
```

### Risposta

**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "Login effettuato con successo",
  "operatore": {
    "idOperatore": 1,
    "uuid": "a1b2c3d4-e5f6-7890-abcd-1234567890ab",
    "operatore": "Mario Rossi",
    "email": "mario@esempio.it",
    "profilo": "amministratore",
    "livello": 1,
    "stato": "attivo",
    "note": "",
    "ultimaLogin": "2025-05-07T09:30:00.000Z",
    "dataCreazione": "2025-01-01T00:00:00.000Z",
    "ultimaModifica": "2025-05-07T09:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Errori

**Status Code:** `401 Unauthorized`

**Body:**
```json
{
  "message": "Credenziali non valide"
}
```

**Status Code:** `400 Bad Request`

**Body:**
```json
{
  "message": "Email e password sono richiesti"
}
```

**Status Code:** `500 Internal Server Error`

**Body:**
```json
{
  "message": "Errore del server"
}
```

### Note
- Il token JWT restituito deve essere utilizzato nelle richieste successive come Bearer token nell'header Authorization
- Il token ha una scadenza configurabile (default: 1 giorno)
- Dopo l'autenticazione, il campo `ultimaLogin` dell'operatore viene aggiornato

---

## Verifica Token

Verifica la validità di un token JWT.

### Richiesta

**Endpoint:** `GET /auth/verify`

**Headers:**
```
Authorization: Bearer [token]
```

**Esempio:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Risposta

**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "Token valido",
  "operatore": {
    "idOperatore": 1,
    "uuid": "a1b2c3d4-e5f6-7890-abcd-1234567890ab",
    "operatore": "Mario Rossi",
    "email": "mario@esempio.it",
    "profilo": "amministratore",
    "livello": 1,
    "stato": "attivo",
    "note": "",
    "ultimaLogin": "2025-05-07T09:30:00.000Z",
    "dataCreazione": "2025-01-01T00:00:00.000Z",
    "ultimaModifica": "2025-05-07T09:30:00.000Z"
  }
}
```

### Errori

**Status Code:** `401 Unauthorized`

**Body:**
```json
{
  "message": "Token non valido o scaduto"
}
```

**Status Code:** `500 Internal Server Error`

**Body:**
```json
{
  "message": "Errore del server"
}
```

### Note
- Questo endpoint è utile per verificare la validità del token salvato lato client
- Restituisce i dati aggiornati dell'operatore, utili per aggiornare lo stato dell'applicazione client

---

## Richiesta Reset Password

Richiede un reset della password inviando un'email con un link di reset.

### Richiesta

**Endpoint:** `POST /auth/request-reset`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "string"
}
```

**Esempio:**
```json
{
  "email": "mario@esempio.it"
}
```

### Risposta

**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "Email di reset inviata con successo"
}
```

### Errori

**Status Code:** `400 Bad Request`

**Body:**
```json
{
  "message": "Email non trovata"
}
```

**Status Code:** `500 Internal Server Error`

**Body:**
```json
{
  "message": "Errore durante l'invio dell'email di reset"
}
```

### Note
- Anche se l'email non esiste nel sistema, la risposta sarà 200 OK per motivi di sicurezza (per evitare enumerazione di account)
- L'email inviata contiene un link con un token di reset con scadenza configurabile (default: 1 ora)
- Il formato del link di reset è: `https://[frontend-url]/reset-password/[token]`

---

## Validazione Token Reset

Verifica la validità di un token di reset password.

### Richiesta

**Endpoint:** `GET /auth/validate-reset-token/:token`

**Parametri URL:**
- `token`: Token di reset password ricevuto via email

**Esempio:**
```
GET /auth/validate-reset-token/abcdef123456789
```

### Risposta

**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "Token valido"
}
```

### Errori

**Status Code:** `400 Bad Request`

**Body:**
```json
{
  "message": "Token non valido o scaduto"
}
```

**Status Code:** `500 Internal Server Error`

**Body:**
```json
{
  "message": "Errore del server"
}
```

### Note
- Questo endpoint viene chiamato quando l'utente accede al link di reset per verificare se il token è ancora valido
- Il frontend dovrebbe verificare la validità del token prima di mostrare il form di reset password

---

## Reset Password

Conferma il reset della password con un nuovo valore.

### Richiesta

**Endpoint:** `POST /auth/reset-password`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "token": "string",
  "newPassword": "string"
}
```

**Esempio:**
```json
{
  "token": "abcdef123456789",
  "newPassword": "NuovaPassword123!"
}
```

### Risposta

**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "Password aggiornata con successo"
}
```

### Errori

**Status Code:** `400 Bad Request`

**Body:**
```json
{
  "message": "Token non valido o scaduto"
}
```

**Status Code:** `400 Bad Request`

**Body:**
```json
{
  "message": "La password non rispetta i requisiti di sicurezza"
}
```

**Status Code:** `500 Internal Server Error`

**Body:**
```json
{
  "message": "Errore durante il reset della password"
}
```

### Note
- La nuova password deve rispettare i requisiti di sicurezza (minimo 8 caratteri, almeno una lettera maiuscola, una minuscola e un numero)
- Dopo il reset della password, tutti i token di sessione esistenti per l'utente vengono invalidati
- L'utente dovrà effettuare nuovamente il login con la nuova password

---

## Cambio Password

Cambia la password di un utente autenticato.

### Richiesta

**Endpoint:** `POST /auth/change-password`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer [token]
```

**Body:**
```json
{
  "currentPassword": "string",
  "newPassword": "string"
}
```

**Esempio:**
```json
{
  "currentPassword": "Password123!",
  "newPassword": "NuovaPassword456!"
}
```

### Risposta

**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "Password aggiornata con successo"
}
```

### Errori

**Status Code:** `400 Bad Request`

**Body:**
```json
{
  "message": "Password attuale non corretta"
}
```

**Status Code:** `400 Bad Request`

**Body:**
```json
{
  "message": "La nuova password non rispetta i requisiti di sicurezza"
}
```

**Status Code:** `401 Unauthorized`

**Body:**
```json
{
  "message": "Token non valido o scaduto"
}
```

**Status Code:** `500 Internal Server Error`

**Body:**
```json
{
  "message": "Errore durante il cambio password"
}
```

### Note
- La nuova password deve essere diversa dalla password attuale
- La nuova password deve rispettare i requisiti di sicurezza (minimo 8 caratteri, almeno una lettera maiuscola, una minuscola e un numero)
- A differenza del reset password, il cambio password non invalida i token di sessione esistenti

---

## Implementazione Backend

L'implementazione backend di questi endpoint si trova in:

- Controller: `src/controllers/auth.controller.ts`
- Routes: `src/routes/auth.routes.ts`
- Middleware: `src/middleware/auth.middleware.ts`

## Implementazione Frontend

I servizi frontend che interagiscono con questi endpoint sono:

- `src/services/authService.ts`
- Redux: `src/store/slices/authSlice.ts`

Per maggiori dettagli sull'implementazione frontend, vedere [Documentazione Servizi Frontend](../frontend/services.md).
