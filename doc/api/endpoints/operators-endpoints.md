# Endpoints Operatori - EDG-ProEdg API

*Ultimo aggiornamento: [DATA]*

## Panoramica

Gli endpoint Operatori gestiscono tutte le operazioni CRUD (Create, Read, Update, Delete) relative agli operatori del sistema EDG-ProEdg. Questi endpoint richiedono autenticazione e sono soggetti a controlli di autorizzazione in base al profilo e al livello dell'operatore.

Base URL: `http://localhost:3000/api` (ambiente di sviluppo)

## Indice
- [Lista Operatori (Paginata)](#lista-operatori-paginata)
- [Dettaglio Operatore](#dettaglio-operatore)
- [Creazione Operatore](#creazione-operatore)
- [Aggiornamento Operatore](#aggiornamento-operatore)
- [Eliminazione Operatore](#eliminazione-operatore)
- [Lista Tutti Operatori](#lista-tutti-operatori)

---

## Lista Operatori (Paginata)

Recupera la lista degli operatori con supporto per paginazione, ordinamento e filtri.

### Richiesta

**Endpoint:** `POST /operatori/filter`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer [token]
```

**Body:**
```json
{
  "pageIndex": 0,
  "pageSize": 10,
  "sort": {
    "field": "string",
    "direction": "ASC" | "DESC"
  },
  "query": {
    "[campo]": "string"
  }
}
```

**Esempio:**
```json
{
  "pageIndex": 0,
  "pageSize": 10,
  "sort": {
    "field": "operatore",
    "direction": "ASC"
  },
  "query": {
    "operatore": "Mario",
    "stato": "attivo"
  }
}
```

### Risposta

**Status Code:** `200 OK`

**Body:**
```json
{
  "items": [
    {
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
    // Altri operatori...
  ],
  "totalItems": 25,
  "totalPages": 3,
  "pageIndex": 0
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

**Status Code:** `403 Forbidden`

**Body:**
```json
{
  "message": "Permessi insufficienti"
}
```

**Status Code:** `500 Internal Server Error`

**Body:**
```json
{
  "message": "Errore durante il recupero degli operatori"
}
```

### Note
- I campi disponibili per i filtri (`query`) sono: `idOperatore`, `operatore`, `email`, `profilo`, `livello`, `stato`
- I campi disponibili per l'ordinamento (`sort.field`) sono: `idOperatore`, `operatore`, `email`, `profilo`, `livello`, `stato`, `ultimaLogin`, `dataCreazione`, `ultimaModifica`
- Per filtrare per corrispondenza parziale (LIKE), usare il valore come stringa (es. `"operatore": "Mar"` per trovare "Mario", "Maria", ecc.)
- Per filtrare per corrispondenza esatta, usare un oggetto con proprietà `eq` (es. `"stato": { "eq": "attivo" }`)

---

## Dettaglio Operatore

Recupera i dettagli di un singolo operatore.

### Richiesta

**Endpoint:** `GET /operatori/:id`

**Parametri URL:**
- `id`: ID dell'operatore

**Headers:**
```
Authorization: Bearer [token]
```

**Esempio:**
```
GET /operatori/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Risposta

**Status Code:** `200 OK`

**Body:**
```json
{
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
```

### Errori

**Status Code:** `401 Unauthorized`

**Body:**
```json
{
  "message": "Token non valido o scaduto"
}
```

**Status Code:** `403 Forbidden`

**Body:**
```json
{
  "message": "Permessi insufficienti"
}
```

**Status Code:** `404 Not Found`

**Body:**
```json
{
  "message": "Operatore non trovato"
}
```

**Status Code:** `500 Internal Server Error`

**Body:**
```json
{
  "message": "Errore durante il recupero dell'operatore"
}
```

### Note
- L'endpoint può essere chiamato con l'ID numerico (`idOperatore`) o con l'UUID (`uuid`) dell'operatore
- Esempio con UUID: `GET /operatori/a1b2c3d4-e5f6-7890-abcd-1234567890ab`

---

## Creazione Operatore

Crea un nuovo operatore nel sistema.

### Richiesta

**Endpoint:** `POST /operatori`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer [token]
```

**Body:**
```json
{
  "operatore": "string",
  "email": "string",
  "password": "string",
  "profilo": "string",
  "livello": 0,
  "stato": "string",
  "note": "string"
}
```

**Esempio:**
```json
{
  "operatore": "Nuovo Operatore",
  "email": "nuovo@esempio.it",
  "password": "Password123!",
  "profilo": "operatore",
  "livello": 3,
  "stato": "attivo",
  "note": "Nuovo operatore di test"
}
```

### Risposta

**Status Code:** `201 Created`

**Body:**
```json
{
  "idOperatore": 10,
  "uuid": "b2c3d4e5-f678-90ab-cdef-1234567890ab",
  "operatore": "Nuovo Operatore",
  "email": "nuovo@esempio.it",
  "profilo": "operatore",
  "livello": 3,
  "stato": "attivo",
  "note": "Nuovo operatore di test",
  "ultimaLogin": null,
  "dataCreazione": "2025-05-07T10:00:00.000Z",
  "ultimaModifica": "2025-05-07T10:00:00.000Z"
}
```

### Errori

**Status Code:** `400 Bad Request`

**Body:**
```json
{
  "message": "Dati operatore non validi",
  "errors": [
    {
      "field": "email",
      "message": "L'email deve essere valida"
    },
    // Altri errori di validazione...
  ]
}
```

**Status Code:** `400 Bad Request`

**Body:**
```json
{
  "message": "Email già in uso"
}
```

**Status Code:** `401 Unauthorized`

**Body:**
```json
{
  "message": "Token non valido o scaduto"
}
```

**Status Code:** `403 Forbidden`

**Body:**
```json
{
  "message": "Permessi insufficienti"
}
```

**Status Code:** `500 Internal Server Error`

**Body:**
```json
{
  "message": "Errore durante la creazione dell'operatore"
}
```

### Note
- Campi obbligatori: `operatore`, `email`, `password`, `profilo`, `livello`, `stato`
- Il campo `email` deve essere unico nel sistema
- Il campo `password` viene automaticamente hashato prima di essere salvato nel database
- Il campo `stato` può essere uno dei seguenti valori: `attivo`, `inattivo`, `eliminato`
- Il campo `profilo` determina le autorizzazioni dell'operatore e può essere uno dei seguenti valori: `amministratore`, `supervisore`, `operatore`
- Il campo `livello` deve essere un numero intero compreso tra 1 e 5
- Solo gli operatori con profilo `amministratore` o `supervisore` possono creare nuovi operatori

---

## Aggiornamento Operatore

Aggiorna i dati di un operatore esistente.

### Richiesta

**Endpoint:** `PUT /operatori/:id`

**Parametri URL:**
- `id`: ID dell'operatore

**Headers:**
```
Content-Type: application/json
Authorization: Bearer [token]
```

**Body:**
```json
{
  "operatore": "string",
  "email": "string",
  "profilo": "string",
  "livello": 0,
  "stato": "string",
  "note": "string"
}
```

**Esempio:**
```json
{
  "operatore": "Operatore Aggiornato",
  "email": "aggiornato@esempio.it",
  "profilo": "supervisore",
  "livello": 2,
  "stato": "attivo",
  "note": "Operatore aggiornato con nuovo profilo"
}
```

### Risposta

**Status Code:** `200 OK`

**Body:**
```json
{
  "idOperatore": 10,
  "uuid": "b2c3d4e5-f678-90ab-cdef-1234567890ab",
  "operatore": "Operatore Aggiornato",
  "email": "aggiornato@esempio.it",
  "profilo": "supervisore",
  "livello": 2,
  "stato": "attivo",
  "note": "Operatore aggiornato con nuovo profilo",
  "ultimaLogin": null,
  "dataCreazione": "2025-05-07T10:00:00.000Z",
  "ultimaModifica": "2025-05-07T11:00:00.000Z"
}
```

### Errori

**Status Code:** `400 Bad Request`

**Body:**
```json
{
  "message": "Dati operatore non validi",
  "errors": [
    {
      "field": "livello",
      "message": "Il livello deve essere compreso tra 1 e 5"
    },
    // Altri errori di validazione...
  ]
}
```

**Status Code:** `400 Bad Request`

**Body:**
```json
{
  "message": "Email già in uso"
}
```

**Status Code:** `401 Unauthorized`

**Body:**
```json
{
  "message": "Token non valido o scaduto"
}
```

**Status Code:** `403 Forbidden`

**Body:**
```json
{
  "message": "Permessi insufficienti"
}
```

**Status Code:** `404 Not Found`

**Body:**
```json
{
  "message": "Operatore non trovato"
}
```

**Status Code:** `500 Internal Server Error`

**Body:**
```json
{
  "message": "Errore durante l'aggiornamento dell'operatore"
}
```

### Note
- L'endpoint può essere chiamato con l'ID numerico (`idOperatore`) o con l'UUID (`uuid`) dell'operatore
- Esempio con UUID: `PUT /operatori/b2c3d4e5-f678-90ab-cdef-1234567890ab`
- Il campo `password` non può essere aggiornato tramite questo endpoint (usa invece `/auth/change-password`)
- Solo gli operatori con profilo `amministratore` o `supervisore` possono aggiornare gli operatori
- Un operatore non può modificare un altro operatore con livello superiore o uguale al proprio
- Un operatore non può aumentare il livello di un altro operatore a un livello superiore al proprio

---

## Eliminazione Operatore

Elimina (logicamente) un operatore dal sistema.

### Richiesta

**Endpoint:** `DELETE /operatori/:id`

**Parametri URL:**
- `id`: ID dell'operatore

**Headers:**
```
Authorization: Bearer [token]
```

**Esempio:**
```
DELETE /operatori/10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Risposta

**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "Operatore eliminato con successo"
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

**Status Code:** `403 Forbidden`

**Body:**
```json
{
  "message": "Permessi insufficienti"
}
```

**Status Code:** `404 Not Found`

**Body:**
```json
{
  "message": "Operatore non trovato"
}
```

**Status Code:** `500 Internal Server Error`

**Body:**
```json
{
  "message": "Errore durante l'eliminazione dell'operatore"
}
```

### Note
- L'endpoint può essere chiamato con l'ID numerico (`idOperatore`) o con l'UUID (`uuid`) dell'operatore
- Esempio con UUID: `DELETE /operatori/b2c3d4e5-f678-90ab-cdef-1234567890ab`
- L'eliminazione è logica, non fisica: l'operatore viene contrassegnato come "eliminato" ma rimane nel database
- Solo gli operatori con profilo `amministratore` o `supervisore` possono eliminare gli operatori
- Un operatore non può eliminare un altro operatore con livello superiore o uguale al proprio
- Un operatore non può eliminare se stesso

---

## Lista Tutti Operatori

Recupera tutti gli operatori senza paginazione.

### Richiesta

**Endpoint:** `GET /operatori`

**Headers:**
```
Authorization: Bearer [token]
```

**Esempio:**
```
GET /operatori
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Risposta

**Status Code:** `200 OK`

**Body:**
```json
[
  {
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
  // Altri operatori...
]
```

### Errori

**Status Code:** `401 Unauthorized`

**Body:**
```json
{
  "message": "Token non valido o scaduto"
}
```

**Status Code:** `403 Forbidden`

**Body:**
```json
{
  "message": "Permessi insufficienti"
}
```

**Status Code:** `500 Internal Server Error`

**Body:**
```json
{
  "message": "Errore durante il recupero degli operatori"
}
```

### Note
- Questo endpoint restituisce tutti gli operatori senza paginazione
- Da utilizzare solo quando è necessario l'elenco completo (es. per popolare dropdown)
- Per liste paginate con filtri, utilizzare l'endpoint `POST /operatori/filter`
- Per grandi quantità di dati, è consigliabile utilizzare l'endpoint paginato

---

## Implementazione Backend

L'implementazione backend di questi endpoint si trova in:

- Controller: `src/controllers/operatori.controller.ts`
- Routes: `src/routes/operatori.routes.ts`
- Model: `src/models/operatori.ts`

## Implementazione Frontend

I servizi frontend che interagiscono con questi endpoint sono:

- `src/services/operatoriService.ts`
- Redux: `src/store/slices/operatoriSlice.ts`

Per maggiori dettagli sull'implementazione frontend, vedere [Documentazione Servizi Frontend](../frontend/services.md).
