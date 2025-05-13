// src/pages/operatori/OperatoreForm.tsx
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createOperatore, updateOperatore } from "../operatori";
import { CircleAlert, Eye, EyeOff, Save } from "lucide-react";
import Modal from "../../core/components/ui/Modal";
import Input from "../../core/components/ui/Input";
import SubmitButton from "../../core/components/ui/SubmitButton";
import Button from "../../core/components/ui/Button";

interface OperatoreFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const OperatoreForm = ({ isOpen, onClose }: OperatoreFormProps) => {
  const dispatch = useAppDispatch();
  const { selectedOperatore, loading, error } = useAppSelector(
    (state) => state.operatori
  );

  // Stati del form
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profilo, setProfilo] = useState("operatore");
  const [livello, setLivello] = useState(8);
  const [stato, setStato] = useState("attivo");
  const [note, setNote] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  // Valori per select
  const profili = ["amministratore", "supervisore", "operatore"];
  const stati = ["attivo", "inattivo", "eliminato"];
  const livelli = [8, 16, 24, 32, 40, 48, 56, 64];

  // Modifica flag
  const isEditMode = !!selectedOperatore;

  // Carica dati operatore se in modifica
  useEffect(() => {
    if (isOpen) {
      if (selectedOperatore) {
        setNome(selectedOperatore.operatore);
        setEmail(selectedOperatore.email);
        setProfilo(selectedOperatore.profilo);
        setLivello(selectedOperatore.livello);
        setStato(selectedOperatore.stato);
        setNote(selectedOperatore.note || "");
        // Reset della password in modifica
        setPassword("");
      } else {
        // Reset form per nuova creazione
        resetForm();
      }
    }
  }, [selectedOperatore, isOpen]);

  // Reset del form
  const resetForm = () => {
    setNome("");
    setEmail("");
    setPassword("");
    setProfilo("operatore");
    setLivello(8);
    setStato("attivo");
    setNote("");
    setFormErrors({});
  };

  // Chiusura modale con reset
  const handleClose = () => {
    resetForm();
    setSuccess(false);
    onClose();
  };

  // Validazione del form
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!nome.trim()) {
      errors.nome = "Il nome è obbligatorio";
    }

    if (!email.trim()) {
      errors.email = "L'email è obbligatoria";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email non valida";
    }

    if (!isEditMode && !password.trim()) {
      errors.password = "La password è obbligatoria per nuovi operatori";
    } else if (!isEditMode && password.length < 8) {
      errors.password = "La password deve contenere almeno 8 caratteri";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit del form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isEditMode && selectedOperatore) {
        // Aggiornamento operatore esistente
        await dispatch(
          updateOperatore({
            id: selectedOperatore.idOperatore,
            operatore: {
              operatore: nome,
              email,
              profilo,
              livello,
              stato,
              note,
            },
          })
        );
      } else {
        // Creazione nuovo operatore
        await dispatch(
          createOperatore({
            operatore: nome,
            email,
            password,
            profilo,
            livello,
            stato,
            note,
          })
        );
      }

      setSuccess(true);

      // Chiudi dopo 2 secondi
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      console.error("Errore durante il salvataggio:", err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditMode ? "Modifica Operatore" : "Nuovo Operatore"}
      size="lg"
    >
      {success ? (
        <div className="bg-green-50 p-4 rounded-md mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                {isEditMode
                  ? "Operatore aggiornato con successo"
                  : "Operatore creato con successo"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          {/* Errore generale */}
          {error && (
            <div className="bg-red-50 p-4 rounded-md mb-4">
              <div className="flex">
                <CircleAlert className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Nome */}
          <div>
            <label
              htmlFor="operatore_nome"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome Operatore *
            </label>
            <Input
              id="operatore_nome"
              name="operatore_nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              error={formErrors.nome}
              required
              autoComplete="off"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="operatore_email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email *
            </label>
            <Input
              id="operatore_email"
              name="operatore_email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={formErrors.email}
              required
              autoComplete="off"
            />
          </div>

          {/* Password (solo per nuovi operatori) */}
          {!isEditMode && (
            <div>
              <label
                htmlFor="operatore_password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password *
              </label>
              <div className="relative">
                <Input
                  id="operatore_password"
                  name="operatore_password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={formErrors.password}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Riga di selettori */}
          <div className="grid grid-cols-3 gap-4">
            {/* Profilo */}
            <div>
              <label
                htmlFor="operatore_profilo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Profilo
              </label>
              <select
                id="operatore_profilo"
                name="operatore_profilo"
                value={profilo}
                onChange={(e) => setProfilo(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              >
                {profili.map((p) => (
                  <option key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Livello */}
            <div>
              <label
                htmlFor="operatore_livello"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Livello
              </label>
              <select
                id="operatore_livello"
                name="operatore_livello"
                value={livello}
                onChange={(e) => setLivello(Number(e.target.value))}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              >
                {livelli.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            {/* Stato */}
            <div>
              <label
                htmlFor="operatore_stato"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Stato
              </label>
              <select
                id="operatore_stato"
                name="operatore_stato"
                value={stato}
                onChange={(e) => setStato(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              >
                {stati.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Note */}
          <div>
            <label
              htmlFor="operatore_note"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Note
            </label>
            <textarea
              id="operatore_note"
              name="operatore_note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              rows={3}
              autoComplete="off"
            />
          </div>

          {/* Azioni */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" type="button" onClick={handleClose}>
              Annulla
            </Button>
            <SubmitButton
              isLoading={loading}
              loadingText="Salvataggio..."
              leftIcon={<Save className="h-4 w-4" />}
            >
              Salva
            </SubmitButton>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default OperatoreForm;
