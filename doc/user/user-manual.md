# Manuale Utente - EDG-ProEdg

## Introduzione

Benvenuto in EDG-ProEdg, il sistema di gestione interno di Express Delivery. Questa guida ti fornirà le istruzioni necessarie per utilizzare efficacemente tutte le funzionalità del sistema.

## Accesso al Sistema

### Login

1. Apri il browser e inserisci l'URL dell'applicazione.
2. Nella schermata di login, inserisci la tua email e password.
3. Clicca sul pulsante "Accedi".

![Schermata di login](./docs/images/login-screen.png)

### Password Dimenticata

Se hai dimenticato la password:

1. Nella pagina di login, clicca su "Password dimenticata? / Reset Password".
2. Inserisci la tua email e clicca su "Invia link".
3. Riceverai un'email con un link per reimpostare la password.
4. Segui il link e inserisci la nuova password.

### Cambio Password

Per cambiare la tua password:

1. Fai clic sul tuo profilo nell'angolo in alto a destra.
2. Seleziona "Cambia Password".
3. Inserisci la password attuale e la nuova password (due volte).
4. Clicca su "Aggiorna Password".

## Interfaccia Principale

### Dashboard

La dashboard è la prima schermata che vedi dopo il login. Fornisce un riepilogo delle informazioni più importanti e l'accesso rapido alle funzionalità principali.

![Dashboard](./docs/images/dashboard.png)

### Menu Principale

Il menu principale si trova nella parte superiore dell'applicazione e permette di navigare tra le diverse sezioni:

- **Dashboard**: Panoramica generale
- **Operatori**: Gestione degli operatori del sistema
- **Utenti**: Gestione degli utenti del sistema
- **Altre sezioni...**: Dipendenti dalle autorizzazioni del tuo profilo

### Menu Utente

Il menu utente è accessibile cliccando sul tuo nome/profilo nell'angolo in alto a destra:

- **Cambia Password**: Modifica la tua password
- **Logout**: Esci dal sistema

## Gestione Operatori

### Visualizzazione Operatori

La pagina Operatori mostra un elenco di tutti gli operatori del sistema, con funzionalità di ricerca e filtro.

Per filtrare gli operatori:
1. Usa i campi di ricerca nella parte superiore della tabella.
2. Seleziona eventuali filtri aggiuntivi (es. stato, profilo).
3. I risultati si aggiornano automaticamente.

### Creazione Nuovo Operatore

Per creare un nuovo operatore:

1. Clicca sul pulsante "+ Nuovo" nella pagina Operatori.
2. Compila tutti i campi obbligatori (contrassegnati con *).
3. Assegna un profilo e un livello appropriati.
4. Clicca su "Salva" per confermare.

### Modifica Operatore

Per modificare un operatore esistente:

1. Clicca sull'icona di modifica ✏️ nella riga dell'operatore.
2. Modifica i campi necessari.
3. Clicca su "Salva" per confermare le modifiche.

### Eliminazione Operatore

Per eliminare un operatore:

1. Clicca sull'icona di eliminazione 🗑️ nella riga dell'operatore.
2. Conferma l'eliminazione nella finestra di dialogo.

**Nota**: L'eliminazione imposta lo stato dell'operatore su "eliminato" ma non lo rimuove completamente dal database.

## Profili e Autorizzazioni

### Tipi di Profilo

Il sistema prevede diversi profili, ciascuno con autorizzazioni specifiche:

- **Amministratore**: Accesso completo a tutte le funzionalità
- **Supervisore**: Gestione degli operatori e monitoraggio
- **Operatore**: Funzionalità operative standard
- **Visualizzatore**: Solo visualizzazione dei dati, senza possibilità di modifica

### Livelli di Accesso

All'interno di ogni profilo, esistono livelli di accesso (da 1 a 5) che determinano quali funzionalità specifiche sono disponibili.

## Risoluzione dei Problemi

### Problemi di Login

- **Credenziali non accettate**: Verifica che Caps Lock sia disattivato e che stai inserendo l'email corretta.
- **Account bloccato**: Dopo troppi tentativi falliti, l'account potrebbe essere temporaneamente bloccato. Contatta l'amministratore.
- **Link di reset non funzionante**: I link di reset password scadono dopo un'ora. Richiedi un nuovo link.

### Errori Comuni

- **Timeout di sessione**: Per motivi di sicurezza, la sessione scade dopo un periodo di inattività. Esegui nuovamente il login.
- **Problemi di visualizzazione**: Prova a ricaricare la pagina o a cancellare la cache del browser.
- **Errori di salvataggio**: Verifica che tutti i campi obbligatori siano compilati e che il formato sia corretto.

## Contatti e Supporto

Per assistenza tecnica:
- Email: supporto@expressdelivery.it
- Telefono: +39 012 3456789
- Orario di supporto: Lun-Ven, 9:00-18:00

---

© 2025 Express Delivery - Tutti i diritti riservati.
