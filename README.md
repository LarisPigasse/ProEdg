# EDG-ProEdg

EDG-ProEdg è un'applicazione web per la gestione interna di Express Delivery, sviluppata con React (frontend) e Node.js con Express (backend).

## 📋 Panoramica

EDG-ProEdg è un sistema di gestione aziendale che permette di:

- Gestire operatori e utenti del sistema
- Amministrare profili e permessi
- Offrire un'interfaccia moderna e reattiva
- Garantire la sicurezza delle operazioni attraverso autenticazione JWT

## 🚀 Tecnologie Utilizzate

### Frontend

- React 18.x con TypeScript
- Vite come build tool
- React Router 6.x per la navigazione
- Redux Toolkit per la gestione dello stato
- TailwindCSS per lo styling
- React Query per la gestione delle chiamate API
- Formik e Yup per la gestione dei form

## 🔧 Prerequisiti

- Node.js 18+
- npm o yarn
- MySQL 8.x

## 📁 Struttura del Progetto

### Frontend (ProEdg)

```
src/
├── assets/                 # Immagini, font, ecc.
├── components/             # Componenti React riutilizzabili
├── config/                 # Configurazioni statiche
├── context/                # Context API e provider
├── features/               # Funzionalità organizzate (per Redux)
├── hooks/                  # Custom hooks React
├── layouts/                # Layout condivisi dell'applicazione
├── pages/                  # Pagine dell'applicazione
├── routes/                 # Configurazione delle route
├── services/               # Servizi e chiamate API
├── store/                  # Configurazione Redux
├── types/                  # Definizioni TypeScript
└── utils/                  # Funzioni di utilità
```
