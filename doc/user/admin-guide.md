# Guida per Amministratori - EDG-ProEdg

*Ultimo aggiornamento: [DATA]*

## Introduzione

Benvenuti nella Guida per Amministratori di EDG-ProEdg. Questo documento fornisce istruzioni dettagliate per amministrare e gestire il sistema EDG-ProEdg, la piattaforma interna di Express Delivery.

Come amministratore, hai accesso a funzionalità avanzate per gestire utenti, configurare il sistema e monitorare le operazioni. Questa guida ti aiuterà a comprendere e utilizzare al meglio queste funzionalità.

## Requisiti di Sistema

### Requisiti Minimi
- Browser web moderno (Chrome, Firefox, Edge, Safari)
- Connessione internet stabile
- Account con profilo "amministratore"

### Requisiti Consigliati
- Schermo con risoluzione almeno 1920x1080
- Connessione internet ad alta velocità

## Accesso Amministrativo

### Accedere come Amministratore

1. Apri il browser e naviga all'URL dell'applicazione
2. Inserisci le tue credenziali (email e password)
3. Fai clic su "Accedi"

Una volta effettuato l'accesso come amministratore, avrai accesso a tutte le funzionalità amministrative del sistema.

### Profili Amministrativi

EDG-ProEdg supporta diversi livelli di accesso amministrativo:

| Profilo | Livello | Descrizione | Permessi |
|---------|---------|-------------|----------|
| Amministratore | 1 | Accesso completo | Tutte le funzionalità del sistema |
| Supervisore | 2 | Gestione operatori e monitoraggio | Gestione operatori, monitoraggio attività |
| Operatore | 3-5 | Funzionalità operative | Funzionalità limitate in base al livello |

## Gestione Operatori

Una delle principali responsabilità degli amministratori è la gestione degli operatori del sistema.

### Visualizzazione Operatori

Per visualizzare tutti gli operatori:

1. Dal menu principale, seleziona "Operatori"
2. Verrà visualizzata una tabella con tutti gli operatori registrati
3. Utilizza la barra di ricerca e i filtri per trovare operatori specifici

### Creazione di un Nuovo Operatore

Per creare un nuovo operatore:

1. Dalla pagina Operatori, fai clic sul pulsante "+ Nuovo"
2. Compila i campi richiesti:
   - **Operatore**: Nome completo dell'operatore
   - **Email**: Indirizzo email (sarà utilizzato per il login)
   - **Password**: Password iniziale (l'operatore dovrà cambiarla al primo accesso)
   - **Profilo**: Seleziona il profilo appropriato
   - **Livello**: Imposta il livello di accesso (da 1 a 5)
   - **Stato**: Normalmente "attivo" per i nuovi operatori
   - **Note**: Eventuali note o informazioni aggiuntive
3. Fai clic su "Salva" per creare l'operatore

### Modifica di un Operatore Esistente

Per modificare un operatore:

1. Dalla tabella operatori, fai clic sull'icona di modifica ✏️ nella riga dell'operatore
2. Modifica i campi necessari
3. Fai clic su "Salva" per confermare le modifiche

### Disattivazione di un Operatore

Per disattivare un operatore (senza eliminarlo):

1. Modifica l'operatore come descritto sopra
2. Cambia il campo "Stato" da "attivo" a "inattivo"
3. Fai clic su "Salva"

L'operatore inattivo non potrà più accedere al sistema, ma i suoi dati rimarranno nel database.

### Eliminazione di un Operatore

Per eliminare un operatore:

1. Dalla tabella operatori, fai clic sull'icona di eliminazione 🗑️ nella riga dell'operatore
2. Conferma l'eliminazione nella finestra di dialogo

**Nota**: L'eliminazione è logica, non fisica. L'operatore verrà contrassegnato come "eliminato" nel database, ma i suoi dati rimarranno per motivi di integrità referenziale e audit.

## Gestione dei Profili e Autorizzazioni

### Impostazione dei Livelli di Accesso

I livelli di accesso determinano quali funzionalità sono disponibili per ciascun operatore:

- **Livello 1**: Accesso completo (riservato agli amministratori principali)
- **Livello 2**: Accesso a tutte le funzionalità tranne configurazioni critiche
- **Livello 3**: Accesso alle funzionalità operative principali
- **Livello 4**: Accesso limitato alle funzionalità operative
- **Livello 5**: Accesso minimo (solo visualizzazione)

Assegna il livello appropriato in base alle responsabilità dell'operatore.

### Matrice di Autorizzazioni

La tabella seguente mostra quali funzionalità sono disponibili per ciascun profilo e livello:

| Funzionalità | Amministratore | Supervisore | Operatore (3) | Operatore (4) | Operatore (5) |
|--------------|----------------|-------------|---------------|---------------|---------------|
| Gestione Operatori | ✓ | ✓ | ✗ | ✗ | ✗ |
| Creazione Operatori | ✓ | ✓ | ✗ | ✗ | ✗ |
| Visualizzazione Operatori | ✓ | ✓ | ✓ | ✓ | ✓ |
| Configurazione Sistema | ✓ | ✗ | ✗ | ✗ | ✗ |
| Gestione Utenti | ✓ | ✓ | ✓ | ✗ | ✗ |
| Visualizzazione Report | ✓ | ✓ | ✓ | ✓ | ✗ |

## Monitoraggio del Sistema

### Dashboard Amministrativa

La dashboard amministrativa fornisce una panoramica dello stato del sistema:

1. Accedi alla dashboard dalla voce "Dashboard" nel menu principale
2. Visualizza statistiche chiave come:
   - Numero di operatori attivi
   - Operatori loggati nelle ultime 24 ore
   - Attività recenti

### Log di Sistema

Per visualizzare i log di sistema:

1. Dal menu principale, seleziona "Strumenti" > "Log di Sistema"
2. Utilizza i filtri per trovare eventi specifici:
   - Tipo di evento (login, modifica, ecc.)
   - Periodo di tempo
   - Operatore coinvolto
3. Fai clic su un evento per visualizzare i dettagli completi

I log di sistema sono essenziali per il troubleshooting e l'audit di sicurezza.

## Sicurezza del Sistema

### Policy di Password

EDG-ProEdg implementa le seguenti policy di password:

- Lunghezza minima: 8 caratteri
- Deve contenere almeno: una lettera maiuscola, una lettera minuscola, un numero
- Scadenza: 90 giorni (configurabile)
- Storia: le ultime 5 password non possono essere riutilizzate

### Gestione delle Sessioni

Le sessioni utente sono gestite automaticamente dal sistema:

- Timeout di inattività: 30 minuti (configurabile)
- Durata massima sessione: 8 ore
- Un utente può avere una sola sessione attiva alla volta

### Audit e Compliance

Tutte le azioni nel sistema vengono registrate nel log di audit, che include:

- Data e ora dell'azione
- Operatore che ha eseguito l'azione
- Tipo di azione (login, logout, modifica, ecc.)
- Dettagli dell'azione
- Indirizzo IP

## Backup e Ripristino

### Backup del Database

I backup del database vengono eseguiti automaticamente:

- Backup completo: ogni giorno alle 01:00
- Backup incrementale: ogni ora
- Retention policy: 30 giorni per i backup giornalieri, 7 giorni per gli incrementali

### Ripristino del Database

Per richiedere un ripristino del database:

1. Contatta il team IT all'indirizzo it@expressdelivery.it
2. Specifica il punto temporale a cui desideri ripristinare
3. Fornisci una giustificazione per il ripristino

**Nota**: Il ripristino del database è un'operazione critica che richiede approvazione.

## Manutenzione del Sistema

### Aggiornamenti

Gli aggiornamenti del sistema vengono gestiti dal team di sviluppo. Come amministratore, verrai informato in anticipo di eventuali aggiornamenti pianificati.

Durante gli aggiornamenti:
- Il sistema potrebbe essere temporaneamente non disponibile
- Gli utenti connessi riceveranno una notifica
- I dati non salvati potrebbero andare persi

### Ottimizzazione delle Prestazioni

Per mantenere le prestazioni ottimali:

1. Esegui regolarmente la pulizia dei dati obsoleti
2. Monitora l'utilizzo del sistema nelle ore di punta
3. Segnala eventuali rallentamenti al team IT

## Risoluzione dei Problemi

### Problemi Comuni e Soluzioni

| Problema | Possibile Causa | Soluzione |
|----------|-----------------|-----------|
| Utente non può accedere | Password errata | Reimposta la password |
| | Account bloccato | Sblocca l'account dalla gestione operatori |
| | Account inattivo | Modifica lo stato in "attivo" |
| Prestazioni lente | Troppi utenti simultanei | Pianifica l'accesso in orari diversi |
| | Problemi di rete | Controlla la connessione internet |
| | Database sovraccarico | Contatta il team IT |
| Dati mancanti | Problema di sincronizzazione | Aggiorna la pagina |
| | Cancellazione accidentale | Richiedi un ripristino |
| | Bug del sistema | Segnala il problema al supporto |

### Contatti di Supporto

Per problemi che non puoi risolvere direttamente:

- **Supporto Tecnico**: supporto@expressdelivery.it
- **Emergenze**: +39 012 3456789 (24/7)
- **Sviluppo**: sviluppo@expressdelivery.it (per segnalazioni di bug)

## Appendice

### Glossario

- **Operatore**: Utente del sistema EDG-ProEdg
- **Profilo**: Insieme di permessi e autorizzazioni
- **Livello**: Granularità dei permessi all'interno di un profilo
- **JWT**: JSON Web Token, utilizzato per l'autenticazione
- **Audit Log**: Registro delle attività nel sistema

### Riferimenti

- [Manuale Utente](./user-manual.md)
- [Linee Guida di Sviluppo](../project/development-guidelines.md)
- [Documentazione API](../api/api-reference.md)

---

© 2025 Express Delivery - Tutti i diritti riservati.
