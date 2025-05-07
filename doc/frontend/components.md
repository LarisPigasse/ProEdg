# Componenti UI - EDG-ProEdg

*Ultimo aggiornamento: [DATA]*

## Introduzione

Questo documento fornisce una panoramica dei componenti UI riutilizzabili disponibili nell'applicazione EDG-ProEdg. Questi componenti sono stati progettati seguendo i principi di riusabilità, accessibilità e coerenza visiva.

## Indice dei Componenti

- [Componenti Layout](#componenti-layout)
  - [MainLayout](#mainlayout)
- [Componenti di Navigazione](#componenti-di-navigazione)
  - [MainMenu](#mainmenu)
  - [ModulesMenu](#modulesmenu)
  - [UserProfileMenu](#userprofilemenu)
- [Componenti UI di Base](#componenti-ui-di-base)
  - [Button](#button)
  - [Input](#input)
  - [SubmitButton](#submitbutton)
- [Componenti Modal](#componenti-modal)
  - [Modal](#modal)
  - [ChangePasswordModal](#changepasswordmodal)
- [Utility e Status](#utility-e-status)
  - [ConnectionStatus](#connectionstatus)
  - [VersionInfo](#versioninfo)

---

## Componenti Layout

### MainLayout

`MainLayout` è il componente di layout principale dell'applicazione che definisce la struttura base delle pagine.

**Percorso file:** `src/layouts/MainLayout.tsx`

**Props:**
- `children`: ReactNode - Contenuto della pagina

**Utilizzo:**
```tsx
import MainLayout from '../layouts/MainLayout';

const MyPage = () => {
  return (
    <MainLayout>
      <div>Contenuto della pagina</div>
    </MainLayout>
  );
};
```

**Struttura:**
- Header con logo e menu di navigazione
- Menu principale nella sidebar
- Area contenuto principale
- Footer con informazioni di copyright e versione

---

## Componenti di Navigazione

### MainMenu

`MainMenu` è il componente che visualizza il menu di navigazione principale, specifico per ciascun modulo.

**Percorso file:** `src/components/navigation/MainMenu.tsx`

**Props:**
- `moduleId`: string - ID del modulo corrente

**Utilizzo:**
```tsx
import MainMenu from '../components/navigation/MainMenu';

<MainMenu moduleId="dashboard" />
```

**Note:**
- Il menu si adatta automaticamente in base al modulo selezionato
- Le voci di menu sono filtrate in base ai permessi dell'utente
- La configurazione del menu è definita in `src/config/menuItems.ts`

### ModulesMenu

`ModulesMenu` visualizza il menu dei moduli disponibili nella header dell'applicazione.

**Percorso file:** `src/components/navigation/ModulesMenu.tsx`

**Props:** Nessuna

**Utilizzo:**
```tsx
import ModulesMenu from '../components/navigation/ModulesMenu';

<ModulesMenu />
```

**Note:**
- I moduli visualizzati dipendono dal profilo e dal livello dell'utente
- La configurazione dei moduli è definita in `src/config/modulesConfig.ts`

### UserProfileMenu

`UserProfileMenu` è un menu dropdown che mostra le informazioni dell'utente e le opzioni di profilo.

**Percorso file:** `src/components/navigation/UserProfileMenu.tsx`

**Props:** Nessuna

**Utilizzo:**
```tsx
import UserProfileMenu from '../components/navigation/UserProfileMenu';

<UserProfileMenu />
```

**Funzionalità:**
- Visualizza nome e profilo dell'utente
- Opzione per cambiare password
- Opzione per logout
- Integrazione con modal di cambio password

---

## Componenti UI di Base

### Button

`Button` è un componente button personalizzato con diverse varianti.

**Percorso file:** `src/components/ui/Button.tsx`

**Props:**
```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}
```

**Utilizzo:**
```tsx
import Button from '../components/ui/Button';
import { Save } from 'lucide-react';

<Button 
  variant="primary" 
  size="md" 
  leftIcon={<Save className="h-4 w-4" />}
  onClick={handleSave}
>
  Salva
</Button>
```

**Varianti:**
- `primary`: Button principale con sfondo colorato (default: sky-500)
- `secondary`: Button secondario con bordo e testo colorato
- `danger`: Button per azioni distruttive (default: rosso)
- `text`: Button testuale senza bordo o sfondo

### Input

`Input` è un componente input personalizzato.

**Percorso file:** `src/components/ui/Input.tsx`

**Props:**
```typescript
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}
```

**Utilizzo:**
```tsx
import Input from '../components/ui/Input';

<Input
  id="email"
  name="email"
  type="email"
  label="Email"
  placeholder="Inserisci email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  required
/>
```

**Note:**
- Se `label` è fornito, viene visualizzata un'etichetta sopra l'input
- Se `error` è fornito, viene visualizzato un messaggio di errore sotto l'input
- Stile visivo coerente con il design system dell'applicazione

### SubmitButton

`SubmitButton` è un componente specializzato per i pulsanti di invio form con stato di caricamento.

**Percorso file:** `src/components/ui/SubmitButton.tsx`

**Props:**
```typescript
interface SubmitButtonProps {
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
}
```

**Utilizzo:**
```tsx
import SubmitButton from '../components/ui/SubmitButton';
import { Save } from 'lucide-react';

<SubmitButton
  isLoading={loading}
  loadingText="Salvataggio in corso..."
  leftIcon={<Save className="h-4 w-4" />}
  fullWidth
>
  Salva
</SubmitButton>
```

**Note:**
- Durante il caricamento, mostra un indicatore di spinner e testo di caricamento
- Disabilita automaticamente il pulsante durante il caricamento

---

## Componenti Modal

### Modal

`Modal` è un componente modale basato su Headless UI.

**Percorso file:** `src/components/ui/Modal.tsx`

**Props:**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
```

**Utilizzo:**
```tsx
import Modal from '../components/ui/Modal';
import { useModal } from '../hooks/useModal';

const { isOpen, openModal, closeModal } = useModal();

<>
  <button onClick={openModal}>Apri Modal</button>
  
  <Modal 
    isOpen={isOpen} 
    onClose={closeModal} 
    title="Titolo Modal"
    size="md"
  >
    <p>Contenuto della modal</p>
    <div className="mt-4 flex justify-end">
      <button onClick={closeModal}>Chiudi</button>
    </div>
  </Modal>
</>
```

**Dimensioni:**
- `sm`: max-w-md (448px)
- `md`: max-w-lg (512px)
- `lg`: max-w-2xl (672px)
- `xl`: max-w-4xl (896px)

**Note:**
- Implementa accessibilità completa (focus trap, navigazione tastiera)
- Chiusura con ESC o cliccando all'esterno
- Animazioni di apertura/chiusura

### ChangePasswordModal

`ChangePasswordModal` è un componente modale specializzato per il cambio password.

**Percorso file:** `src/components/auth/ChangePasswordModal.tsx`

**Props:**
```typescript
interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**Utilizzo:**
```tsx
import ChangePasswordModal from '../components/auth/ChangePasswordModal';
import { useModal } from '../hooks/useModal';

const { isOpen, openModal, closeModal } = useModal();

<>
  <button onClick={openModal}>Cambia Password</button>
  <ChangePasswordModal isOpen={isOpen} onClose={closeModal} />
</>
```

**Funzionalità:**
- Form per inserimento password attuale
- Form per inserimento e conferma nuova password
- Validazione dei dati
- Gestione stati di caricamento e errori
- Messaggio di successo con chiusura automatica

---

## Utility e Status

### ConnectionStatus

`ConnectionStatus` è un componente che mostra lo stato della connessione con il backend.

**Percorso file:** `src/components/layout/ConnectionStatus.tsx`

**Props:** Nessuna

**Utilizzo:**
```tsx
import ConnectionStatus from '../components/layout/ConnectionStatus';

<ConnectionStatus />
```

**Stati:**
- Connesso: Indicatore verde
- In attesa: Indicatore giallo
- Disconnesso: Indicatore rosso

### VersionInfo

`VersionInfo` mostra informazioni sulla versione dell'applicazione.

**Percorso file:** `src/components/layout/VersionInfo.tsx`

**Props:** Nessuna

**Utilizzo:**
```tsx
import VersionInfo from '../components/layout/VersionInfo';

<VersionInfo />
```

**Note:**
- Visualizza numero di versione e data di rilascio
- Le informazioni di versione sono definite in `src/config/constants.ts`

---

## Hooks Associati

### useModal

`useModal` è un hook personalizzato per gestire lo stato delle modal.

**Percorso file:** `src/hooks/useModal.ts`

**Return Value:**
```typescript
{
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}
```

**Utilizzo:**
```tsx
import { useModal } from '../hooks/useModal';

const { isOpen, openModal, closeModal, toggleModal } = useModal();
```

---

## Best Practices per l'Utilizzo dei Componenti

### Riutilizzo dei Componenti
- Utilizzare i componenti UI di base invece di implementare elementi HTML diretti
- Mantenere la coerenza visiva utilizzando i componenti standard

### Accessibilità
- I componenti sono progettati per essere accessibili, non modificare attributi ARIA
- Mantenere la navigazione da tastiera funzionante

### Estensione
- Quando si creano nuovi componenti, seguire lo stesso pattern di design
- Documentare i nuovi componenti in questo documento

### Stile
- Non modificare direttamente lo stile dei componenti
- Utilizzare le props e le varianti fornite per personalizzare l'aspetto

---

## Riferimenti

- [TailwindCSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.dev/)
- [Lucide Icons](https://lucide.dev/)
