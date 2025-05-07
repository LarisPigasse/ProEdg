# Linee Guida di Sviluppo Frontend

## Principi Generali

1. **Componenti Piccoli e Riutilizzabili**: Preferire componenti focalizzati su una singola responsabilità.
2. **Consistenza Visiva**: Mantenere un'esperienza utente coerente in tutta l'applicazione.
3. **Codice Pulito**: Leggibilità, manutenibilità e semplicità sono priorità.
4. **Approccio Pragmatico**: Utilizzare librerie specializzate per funzionalità complesse, incapsulate in wrapper coerenti con il resto dell'applicazione.

## Struttura dei Componenti

### Organizzazione delle Cartelle

```
src/components/
├── ui/               # Componenti di base
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Select.tsx
├── forms/            # Componenti specifici per form
│   ├── FormGroup.tsx
│   └── ErrorMessage.tsx
├── feedback/         # Componenti di feedback all'utente
│   ├── Alert.tsx
│   └── Toast.tsx
├── layout/           # Componenti di layout
│   └── Card.tsx
└── data/             # Componenti per dati
    └── DataTable.tsx
```

### Definizione dei Componenti

- Utilizzare **TypeScript** per definire tipi e interfacce di props
- Fornire valori predefiniti per props opzionali
- Supportare la prop `className` per estendere gli stili
- Utilizzare nomi di props coerenti tra componenti simili

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}
```

### Stili e Design

- Utilizzare **Tailwind CSS** come framework di stile principale
- Mantenere coerenza nei colori, dimensioni, arrotondamenti e spaziature
- Per componenti complessi, utilizzare classi utilitarie in file separati
- Preferire colori neutri per il layout, colori primari per azioni e feedback

## Librerie Esterne e Componenti Wrapper

### Approccio Ibrido Raccomandato

1. **Componenti UI di Base**: Implementare componenti personalizzati per elementi semplici e frequenti

   - Button, Input, Card, Alert, Badge, ecc.

2. **Componenti Headless**: Utilizzare librerie headless per componenti interattivi complessi

   - **@headlessui/react** o **@radix-ui/react** per Dropdown, Modal, Tabs, ecc.
   - Personalizzare l'aspetto con Tailwind CSS

3. **Wrapper per Librerie Specializzate**: Creare wrapper consistenti per
   - **TanStack Table** (tabelle dati)
   - **Formik + Yup** (gestione form)
   - **React Query** (gestione dati remoti)

## Componenti da Implementare

### Componenti UI Base

1. **Button**

   - Varianti: primary, secondary, outline, danger, success
   - Stati: default, hover, active, disabled, loading
   - Proprietà: size, fullWidth, leftIcon, rightIcon

2. **Input**

   - Tipi: text, email, password, number
   - Stati: default, focus, error, disabled
   - Proprietà: label, placeholder, helperText, errorMessage

3. **Select**

   - Stati: default, open, disabled, error
   - Proprietà: options, placeholder, multiple

4. **Card**

   - Componenti: Card, Card.Header, Card.Body, Card.Footer
   - Varianti: outline, elevated, flat

5. **Badge/Tag**

   - Varianti: default, primary, success, warning, danger

6. **Alert**
   - Varianti: info, success, warning, error
   - Proprietà: title, message, icon, dismissible

### Componenti Form (Basati su Formik)

1. **Form**: Wrapper per Formik con stili coerenti
2. **TextField**: Input testo con gestione errori
3. **SelectField**: Select dropdown con gestione errori
4. **CheckboxField**: Checkbox con label
5. **RadioGroupField**: Gruppo di radio button
6. **SwitchField**: Toggle switch
7. **DatePickerField**: Selezione data

### Componenti Dati (Basati su TanStack Table)

1. **DataTable**: Wrapper per TanStack Table con:
   - Paginazione preconfigurata
   - Ordinamento colonne
   - Filtri
   - Selezione righe
   - Azioni per riga

## Convenzioni di Nomenclatura

1. **Nomi dei Componenti**: PascalCase (es. `Button`, `DataTable`)
2. **Nomi dei File**: Corrispondenti al nome del componente (es. `Button.tsx`)
3. **Nomi delle Props**: camelCase (es. `isLoading`, `fullWidth`)
4. **Varianti/Enum**: lowercase per valori (es. `variant="primary"`)
5. **Eventi**: Prefisso `on` + descrizione (es. `onClick`, `onFilterChange`)

## Accessibilità

1. Utilizzare attributi ARIA appropriati
2. Assicurare la navigabilità da tastiera
3. Mantenere un contrasto adeguato per testo e controlli
4. Fornire testi alternativi per elementi visuali
5. Supportare dimensioni del testo flessibili

## Gestione Stato

1. **Redux** per stato globale dell'applicazione

   - Autenticazione
   - Preferenze utente
   - Dati condivisi tra molti componenti

2. **useState/useReducer** per stato locale dei componenti

3. **React Query** per:
   - Chiamate API
   - Caching
   - Sincronizzazione
   - Gestione caricamento e errori

## Performance

1. Utilizzare componenti React.memo dove appropriato
2. Evitare ri-render non necessari
3. Utilizzare lazy loading per componenti pesanti o rotte poco utilizzate
4. Ottimizzare immagini e asset

## Testing

1. **Unit Test** per componenti UI con React Testing Library
2. **Integration Test** per flussi utente chiave
3. **Test automatici** sulla build CI/CD

---

Queste linee guida sono un documento vivo che evolverà insieme all'applicazione. L'obiettivo è mantenere codice coerente, leggibile e manutenibile, bilanciando la creazione di componenti personalizzati con l'utilizzo efficace di librerie specializzate.
