# Documentazione di Riferimento API EDG-ProEdg

_Ultimo aggiornamento: [DATA]_

## Introduzione

Questa documentazione fornisce una panoramica delle API RESTful disponibili nel backend di EDG-ProEdg. Per dettagli completi su ciascun gruppo di endpoint, consultare i documenti specifici linkati in ciascuna sezione.

## Base URL

- Ambiente di sviluppo: `http://localhost:3000/api`
- Ambiente di produzione: `https://api.edgpro.expressdelivery.it`

## Autenticazione

Tutte le API (eccetto alcune specifiche come login e reset password) richiedono autenticazione tramite JWT Bearer token.

### Header di Autenticazione

```
Authorization: Bearer [token]
```

Il token JWT viene ottenuto tramite la procedura di login e ha una scadenza configurabile (default: 1 giorno).

### Maggiori Dettagli

Per documentazione completa sugli endpoint di autenticazione, vedere [Endpoints di Autenticazione](./endpoints/auth-endpoints.md).

## Formato Risposta Standard

Le risposte API seguono un formato standard:

### Risposta di Successo

```json
{
  "data": [], // o {} per risposta singola
  "message": "Operazione completata con successo"
}
```

### Risposta di Errore

```json
{
  "message": "Descrizione dell'errore",
  "errors": [] // dettagli aggiuntivi (opzionale)
}
```

## Endpoint Disponibili

### Autenticazione

| Metodo | Endpoint                            | Descrizione             | Autenticazione Richiesta |
| ------ | ----------------------------------- | ----------------------- | ------------------------ |
| POST   | `/auth/login`                       | Autentica un utente     | No                       |
| GET    | `/auth/verify`                      | Verifica validità token | Sì                       |
| POST   | `/auth/request-reset`               | Richiede reset password | No                       |
| GET    | `/auth/validate-reset-token/:token` | Valida token reset      | No                       |
| POST   | `/auth/reset-password`              | Conferma reset password | No                       |
| POST   | `/auth/change-password`             | Cambia password         | Sì                       |

[Documentazione Completa Autenticazione](./endpoints/auth-endpoints.md)

### Operatori

| Metodo | Endpoint            | Descrizione                 | Autenticazione Richiesta |
| ------ | ------------------- | --------------------------- | ------------------------ |
| POST   | `/operatori/filter` | Lista paginata operatori    | Sì                       |
| GET    | `/operatori/:id`    | Dettaglio singolo operatore | Sì                       |
| POST   | `/operatori`        | Crea nuovo operatore        | Sì                       |
| PUT    | `/operatori/:id`    | Aggiorna operatore          | Sì                       |
| DELETE | `/operatori/:id`    | Elimina operatore           | Sì                       |
| GET    | `/operatori`        | Lista completa operatori    | Sì                       |

[Documentazione Completa Operatori](./endpoints/operators-endpoints.md)

### Altre API

Altri endpoint specifici verranno documentati in documenti separati man mano che vengono implementati:

- Utenti
- Clienti
- Altri moduli specifici dell'applicazione

## Paginazione, Filtri e Ordinamento

Le API che supportano paginazione, filtri e ordinamento seguono uno schema standard:

### Richiesta

```json
{
  "pageIndex": 0, // Indice pagina (inizia da 0)
  "pageSize": 10, // Dimensione pagina
  "sort": {
    "field": "nome", // Campo per ordinamento
    "direction": "ASC" // ASC o DESC
  },
  "query": {
    "campo1": "valore1", // Filtro semplice (LIKE)
    "campo2": {
      // Filtro avanzato
      "eq": "valore2" // Uguaglianza esatta
    }
  }
}
```

### Risposta

```json
{
  "items": [], // Array di elementi per pagina corrente
  "totalItems": 25, // Numero totale di elementi
  "totalPages": 3, // Numero totale di pagine
  "pageIndex": 0 // Indice pagina corrente
}
```

## Codici di Stato HTTP

| Codice | Descrizione                                         |
| ------ | --------------------------------------------------- |
| 200    | OK - Richiesta completata con successo              |
| 201    | Created - Risorsa creata con successo               |
| 400    | Bad Request - Richiesta non valida                  |
| 401    | Unauthorized - Autenticazione mancante o non valida |
| 403    | Forbidden - Permessi insufficienti                  |
| 404    | Not Found - Risorsa non trovata                     |
| 500    | Internal Server Error - Errore del server           |

## Gestione Errori

Gli errori API sono restituiti con un codice di stato HTTP appropriato e un payload JSON che descrive l'errore:

```json
{
  "message": "Descrizione dell'errore",
  "errors": [
    {
      "field": "campo",
      "message": "Messaggio di errore specifico"
    }
  ]
}
```

## Versionamento API

Attualmente l'API è alla versione 1.0. Il versionamento è implicito nell'URL base.

## Limiti di Chiamate API

Non ci sono limiti espliciti alle chiamate API in ambiente di sviluppo, ma in produzione potrebbe essere implementato un rate limiting per motivi di sicurezza.

## Implementazioni Client

Per le implementazioni client, vedere:

- [Documentazione Servizi Frontend](../frontend/services.md)
- [Esempi di Codice](../frontend/examples.md)

## Note per gli Sviluppatori

- Tutte le date sono in formato ISO 8601 (es. `2025-05-07T09:30:00.000Z`)
- I campi ID hanno due formati: numerici (`idOperatore`) e UUID (`uuid`)
- Tutti gli endpoint che accettano un ID possono essere chiamati con l'ID numerico o con l'UUID

## Feedback e Contributi

Per segnalare problemi, richiedere nuove funzionalità o contribuire alla documentazione API, contattare il team di sviluppo all'indirizzo sviluppo@expressdelivery.it.
