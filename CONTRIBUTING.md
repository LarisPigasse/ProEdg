# Contribuire a EDG-ProEdg

Grazie per il tuo interesse a contribuire a EDG-ProEdg! Questo documento fornisce le linee guida per contribuire allo sviluppo del progetto.

## Processo di Sviluppo

### Workflow Git

Utilizziamo un workflow basato su feature branch. Ecco i passaggi da seguire:

1. **Fork del repository** (per collaboratori esterni) o crea un nuovo branch (per collaboratori interni).
2. **Crea un branch specifico per la feature** dal branch principale:
   ```bash
   git checkout -b feature/nome-feature
   ```
   oppure per bugfix:
   ```bash
   git checkout -b fix/nome-bugfix
   ```
3. **Sviluppa la tua feature o correzione**.
4. **Esegui i test** per assicurarti che tutto funzioni correttamente.
5. **Commit delle modifiche** seguendo le convenzioni di commit indicate sotto.
6. **Push del branch** al repository:
   ```bash
   git push origin feature/nome-feature
   ```
7. **Crea una Pull Request** per richiedere l'integrazione nel branch principale.

### Convenzioni di Commit

Utilizziamo una convenzione di commit standardizzata per mantenere una storia chiara:

- **Feat**: Nuova funzionalità
- **Fix**: Correzione di un bug
- **Docs**: Modifiche alla documentazione
- **Style**: Cambiamenti di formattazione, non funzionali
- **Refactor**: Refactoring del codice senza cambiamenti funzionali
- **Test**: Aggiunta o correzione di test
- **Chore**: Aggiornamenti di build, configurazioni, ecc.

Esempio:
```
Feat: Aggiunta funzionalità di filtro avanzato per operatori
```

### Processo di Pull Request

1. Assicurati che il tuo codice rispetti le linee guida di stile.
2. Aggiorna la documentazione se necessario.
3. Includi una descrizione chiara della tua PR spiegando cosa hai modificato e perché.
4. Se la PR risolve un issue, fai riferimento a quell'issue nel messaggio.
5. Attendi la review del codice da parte del team di sviluppo.

## Linee Guida di Codifica

### Frontend (React/TypeScript)

- Utilizza componenti funzionali e hooks anziché componenti di classe.
- Mantieni i componenti piccoli e focalizzati su una singola responsabilità.
- Utilizza TypeScript in modo appropriato definendo interface e type per tutti i dati.
- Segui una struttura di file e cartelle coerente come definita nel progetto.
- Utilizza TailwindCSS per lo styling rispettando il design system.

### Backend (Node.js/Express/TypeScript)

- Organizza il codice seguendo il pattern Model-Controller-Route.
- Utilizza TypeScript per definire interface chiare per tutti i modelli e le risposte API.
- Implementa la validazione dei dati sia sui modelli che sulle richieste in arrivo.
- Scrivi test unitari per la logica di business.
- Segui le convenzioni RESTful per gli endpoint API.

### Convenzioni di Nomenclatura

#### Database
- Le tabelle iniziano con la lettera maiuscola (es. `Operatori`, `Utenti`)
- Gli ID primari hanno il prefisso "id" seguito dal nome dell'entità (es. `idOperatore`)
- Le chiavi esterne hanno il prefisso "fk" seguito dal nome dell'entità riferita (es. `fkFornitore`)

#### Codice
- Utilizza camelCase per variabili e funzioni in JavaScript/TypeScript
- Utilizza PascalCase per i nomi dei componenti React e delle classi
- Utilizza UPPER_SNAKE_CASE per costanti
- I file dei componenti React seguono il PascalCase (es. `UserProfileMenu.tsx`)
- I file di servizi, utilità e hook seguono il camelCase (es. `authService.ts`)

## Test

### Frontend

- Scrivi test unitari per componenti e logica con Jest e React Testing Library.
- Assicurati che tutti i test passino prima di inviare una PR.

### Backend

- Scrivi test unitari per i controller e i servizi.
- Includi test di integrazione per gli endpoint API.
- Verifica che tutti i test passino prima di inviare una PR.

## Documentazione

- Aggiorna la documentazione quando apporti modifiche significative.
- Usa JSDoc per documentare le funzioni e le classi.
- Includi commenti esplicativi per codice complesso.
- Mantieni aggiornati README, CHANGELOG e altri documenti del progetto.

## Direttive per le Issue

- Utilizza i template di issue forniti quando possibile.
- Includi passaggi dettagliati per riprodurre i bug.
- Per le richieste di funzionalità, descrivi chiaramente il problema che stai cercando di risolvere.
- Utilizza le etichette appropriate (bug, enhancement, documentation, etc.).

---

Grazie per seguire queste linee guida e per contribuire a migliorare EDG-ProEdg!
