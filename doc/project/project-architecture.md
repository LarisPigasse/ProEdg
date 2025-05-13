# Architettura Progetto React + Node.js

## Informazioni Generali

- **Nome progetto**: EDG - EdgPro
- **Data ultimo aggiornamento**: 2025-05-12
- **Sessione corrente**: 5
- **Repository**:
  - Frontend: [ProEdg](https://github.com/LarisPigasse/ProEdg.git)
  - Backend: [ApiEdg](https://github.com/LarisPigasse/ApiEdg.git)

## Struttura del Progetto

### Frontend (ProEdg) - Feature-Based

```
src/
├── app/                                # Configurazione principale dell'app
│   ├── costants.ts                     # Costanti globali
│   ├── hooks.ts                        # Hook tipizzati per Redux
│   ├── menuItems.ts                    # Definizione degli elementi del menu
│   ├── moduleItems.ts                  # Definizione degli elementi del moduli
│   ├── rootReducer.ts                  # Combina tutti i singoli reducer in un unico reducer root
│   ├── store.ts                        # Configurazione Redux store
├── core/                               # Componenti e utility condivisi
|   ├── components/                     # Componenti riutilizzabili
│   │   ├── layout/                     # Componenti base del layout
│   │   │   ├── AppLogo.tsx             # Logo dell'applicazione
│   │   │   ├── ConnectionStatus.tsx    # Indicatore connessione backend
│   │   │   ├── Footer.tsx              # Footer dell'applicazione
│   │   │   ├── Header.tsx              # Header dell'applicazione
│   │   │   └── VersionInfo.tsx         # Componente info versione
│   │   ├── navigation/                 # Componenti navigazione
│   │   │   ├── MainMenu.tsx            # Menu principale
│   │   │   ├── ModuleDropdownItem.tsx  # Elemento dropdown del menu moduli
│   │   │   ├── ModuleMenuItem.tsx      # Elemento nel menu dei moduli
│   │   │   ├── ModulesMenu.tsx         # Menu dei moduli nella header
│   │   │   ├── FooterMenu.tsx          # Menu nel footer
│   │   │   └── UserProfileMenu.tsx     # Menu utente con dropdown
│   │   └── ui/                         # Componenti base dell'interfaccia utente
│   │       ├── Button.tsx              # Componente button con varianti
│   │       ├── Input.tsx               # Componente input con varianti
│   │       ├── SubmitButton.tsx        # Componente button per submit
│   │       └── Modal.tsx               # Componente modale base
│   ├── hooks/                          # Hook personalizzati condivisi
│   │   ├── index.ts                    # Barrel file degli Hooks
│   │   └── useModal.ts                 # Hook per gestione modal
│   ├── services/                       # Servizi di base condivisi
│   │   ├── apiService.ts               # Servizio base per le richieste API
│   │   └── index.ts                    # Barrel file dei services
│   └── utils/                          # Utility condivise
├── features/                           # Feature/moduli dell'applicazione
│   ├── auth/                           # Feature di autenticazione (flat)
│   │   ├── AuthInitializer.tsx         # Componente per verifica autenticazione
│   │   ├── authService.ts              # Servizio autenticazione
│   │   ├── authSlice.ts                # Slice Redux per auth
│   │   ├── ChangePasswordModal.tsx     # Modal cambio password
│   │   ├── index.ts                    # Barrel file exports
│   │   ├── Login.tsx                   # Pagina login
│   │   ├── ResetPasswordConfirm.tsx    # Pagina conferma reset password
│   │   └── ResetPasswordRequest.tsx    # Pagina richiesta reset password
│   ├── operatori/                      # Feature di gestione operatori (flat)
│   │   ├── index.ts                    # Barrel file exports
│   │   ├── OperatoreForm.tsx           # Form creazione/modifica operatore
│   │   ├── OperatoriList.tsx           # Pagina lista operatori
│   │   ├── operatoriService.ts         # Servizio API operatori
│   │   └── operatoriSlice.ts           # Slice Redux per operatori
│   ├── shared/                         # Feature per componenti condivisi a livello applicativo
│   │   ├── index.ts                    # Barrel file exports
│   │   ├── Dashboard.tsx               # Form creazione/modifica operatore
│   │   └── NotFound.tsx                # Slice Redux per operatori
├── layouts/                            # Layout condivisi dell'applicazione
│   └── MainLayout.tsx                  # Layout principale con header, menu, content e footer
└── routes/                             # Configurazione delle route
    └── index.tsx                       # Definizione delle route dell'applicazione

```

### Backend (ApiEdg)

```
src/
├── config/                         # Configurazioni
│   └── database.ts                 # Connessione al database
├── controllers/                    # Controller per le route
│   ├── auth.Controller.ts          # Controller per autenticazione
│   └── operatori.Controller.ts     # Controller per gestione operatori
├── middleware/                     # Middleware Express
│   └── auth.Middleware.ts          # Middleware per autenticazione
├── models/                         # Modelli dati/database
│   ├── operatori.ts                # Model operatori
│   └── resetToken.ts               # Model per il reset della password
├── routes/                         # Definizioni delle route API
│   ├── auth.routes.ts              # Route per servizi di autenticazione
|   ├── operatori.routes.ts         # Route per gestione operatori
│   └── utils.routes.ts             # Route utili
├── services/
│   ├── emailService.ts             # Servizio invio email automatiche
│   └── email-templates/            # Template per le email atuomatiche
│       ├── passwordReset.ts        # Template per il reset della password e per la conferma
│       └── baseTemplate.ts         # Templare di base per elementi comuni a tutte le email automatiche
├── types/                          # Definizioni TypeScript
└── utils/                          # Funzioni di utilità
```

## Stack Tecnologico

### Frontend

| Tecnologia            | Versione | Scopo                           |
| --------------------- | -------- | ------------------------------- |
| Vite                  | Latest   | Build tool e dev server         |
| React                 | 18.x     | Libreria UI                     |
| TypeScript            | 5.x      | Type safety e manutenibilità    |
| React Router          | 6.x      | Navigazione                     |
| React Query           | 5.x      | Gestione chiamate API e caching |
| Redux Toolkit         | Latest   | Gestione stato globale          |
| TailwindCSS           | 3.x      | Styling                         |
| TanStack Table        | 8.x      | Tabelle complesse               |
| Formik                | 2.x      | Gestione form                   |
| Yup                   | Latest   | Validazione form                |
| Jest                  | Latest   | Testing                         |
| React Testing Library | Latest   | Testing componenti              |

### Backend

| Tecnologia | Versione | Scopo                        |
| ---------- | -------- | ---------------------------- |
| Node.js    | 18+      | Runtime JavaScript           |
| Express.js | 4.x      | Framework web                |
| TypeScript | 5.x      | Type safety e manutenibilità |
| MySQL      | 8.x      | Database relazionale         |
| Sequelize  | 6.x      | ORM per MySQL                |

## Stato Sviluppo Frontend

| Componente/Pagina       | Stato           | Note                                           |
| ----------------------- | --------------- | ---------------------------------------------- |
| Configurazione progetto | 🟢 Completato   | Stack tecnologico definito e installato        |
| Setup iniziale con Vite | 🟢 Completato   | Progetto inizializzato con Vite e TypeScript   |
| Routing                 | 🟢 Completato   | Sistema di routing di base implementato        |
| Layout principale       | 🟢 Completato   | Layout con header, menu, content e footer      |
| Struttura Redux         | 🟢 Completato   | Store configurato con slice per auth           |
| Struttura componenti    | 🟢 Completato   | Architettura modulare con componenti atomici   |
| Menu moduli             | 🟢 Completato   | Menu con supporto dropdown e permessi          |
| User profile            | 🟢 Completato   | Menu utente con dropdown implementato          |
| Indicatore connessione  | 🟢 Completato   | Verifica e mostra stato connessione al backend |
| Autenticazione          | 🟢 Completato   | Slice redux e UI implementati, reset password  |
| Pagine CRUD operatori   | 🔴 Non iniziato | Da implementare                                |

## Stato Sviluppo Backend

| API/Servizio                      | Stato         | Endpoint            | Note                                 |
| --------------------------------- | ------------- | ------------------- | ------------------------------------ |
| Configurazione backend            | 🟢 Completato | -                   | -                                    |
| Def. modelli dati con Sequelize   | 🟢 Completato | -                   | Modello Operatori creato             |
| Implementazione delle route API   | 🟢 Completato | -                   | Route per Operatori create           |
| Configurazione autenticazione JWT | 🟢 Completato | -                   | -                                    |
| Autenticazione                    | 🟢 Completato | `/api/auth`         | Login, token verify, change password |
| Operatori                         | 🟢 Completato | `/api/operatori`    | CRUD completo con autorizzazioni     |
| Endpoint health check             | 🟢 Completato | `/api/utils/health` | Per verifica connessione             |

## Decisioni Architetturali

- **Frontend**: SPA (Single Page Application) con React e TypeScript
- **Backend**: API RESTful con Express e TypeScript
- **Database**: MySQL per la persistenza dei dati
- **ORM**: Sequelize per interazione con database
- **Gestione stato**: Redux per stato globale, React Query per dati remoti
- **Styling**: TailwindCSS utility-first approach con estensioni custom
- **Icone**: Lucide Icons per un design minimalista e professionale
- **Formulari**: Formik con validazione Yup
- **Build tool**: Vite per HMR veloce e build ottimizzate
- **Tabelle**: TanStack Table per gestione tabelle complesse
- **Autenticazione**: JWT implementato nel backend, in corso nel frontend
- **Layout**: Layout responsive ottimizzato con priorità al content
- **Componenti**: Architettura modulare con componenti piccoli e focalizzati
- **Configurazione**: Costanti globali centralizzate per facile manutenzione

## Progressi Sessioni

### Sessione 1 (2025-04-08)

- Discussione iniziale dell'architettura
- Creazione repository Git (frontend e backend)
- Definizione stack tecnologico frontend
- Creazione file di documentazione dell'architettura

### Sessione 2 (2025-04-22)

- Implementazione backend: modello Operatori, controller, routes, autenticazione
- Inizializzazione progetto frontend con Vite e TypeScript
- Configurazione TailwindCSS
- Creazione struttura base del progetto
- Implementazione sistema di routing
- Creazione layout principale responsive con header, menu, content e footer
- Aggiornamento documentazione dell'architettura

### Sessione 3 (2025-04-28)

- Ottimizzazione layout per dare priorità al content
- Implementazione struttura modulare dei componenti
- Creazione menu moduli con dropdown e gestione permessi
- Implementazione profile dropdown con info utente
- Configurazione Redux con slice per autenticazione
- Aggiunta indicatore stato connessione al backend
- Implementazione file costanti globali
- Estensione TailwindCSS con classi personalizzate (text-xxs)
- Aggiornamento documentazione dell'architettura

### Sessione 4 (2025-05-05)

- Pagine per autenticazione e reset passwors
- Prevista gestione UUID per le entità principali, per ora solo operatori
- Frontend, sempre seguendo filosofia dei piccoli componenti, abbiamo definito Button, SubmitButton e Input
- Aggiornamento documentazione dell'architettura

## TODO Prossima Sessione

- Implementare l'autenticazione nel frontend integrandola con le API del backend
- Creare la pagina di login
- Implementare gestione token JWT e persistenza sessione
- Implementare route protette
- Creare endpoint health check nel backend
- Creare la pagina di gestione degli operatori con tabella e form
- Implementare React Query per chiamate API

## Note Importanti

- Prioritizzare la modularità e la riusabilità dei componenti
- Mantenere una chiara separazione delle responsabilità tra frontend e backend
- Documentare i tipi TypeScript in modo completo
- Assicurare che l'interfaccia utente sia responsive e funzioni su diversi dispositivi
- Evitare stringhe hardcoded utilizzando le costanti globali
