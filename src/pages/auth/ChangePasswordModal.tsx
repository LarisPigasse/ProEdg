// src/components/auth/ChangePasswordModal.tsx
import { useState, FormEvent, useEffect } from "react";
import { Eye, EyeOff, Save } from "lucide-react";
import { authService } from "../../services/authService";
import Input from "../../components/ui/Input";
import SubmitButton from "../../components/ui/SubmitButton";
import Modal from "../../components/ui/Modal";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal = ({ isOpen, onClose }: ChangePasswordModalProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Reset dello stato quando la modal si apre
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess(false);
    setLoading(false);
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  // Chiusura della modal dopo successo
  const handleCloseAfterSuccess = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validazione
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Tutti i campi sono obbligatori");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Le password non corrispondono");
      return;
    }

    if (newPassword.length < 8) {
      setError("La nuova password deve contenere almeno 8 caratteri");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      // Chiamata API per cambiare password
      await authService.changePassword({
        currentPassword,
        newPassword,
      });

      // Reset dei campi e mostra messaggio di successo
      setSuccess(true);

      // Chiudi automaticamente la modal dopo 3 secondi
      setTimeout(() => {
        handleCloseAfterSuccess();
      }, 3000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Errore durante il cambio password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={success ? handleCloseAfterSuccess : onClose}
      title="Cambio Password"
      size="md"
    >
      {success ? (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="text-sm text-green-700">
              <p>Password aggiornata con successo!</p>
              <p className="mt-1">
                La finestra si chiuderà automaticamente tra pochi secondi.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-6 rounded-md bg-red-50 p-3">
              <div className="flex">
                <div className="text-sm text-red-600">{error}</div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {/* Campo Password Attuale */}
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password attuale
              </label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Campo Nuova Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nuova password
              </label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Campo Conferma Nuova Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Conferma nuova password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              Annulla
            </button>
            <SubmitButton
              isLoading={loading}
              loadingText="Aggiornamento..."
              leftIcon={<Save className="h-4 w-4" />}
            >
              Aggiorna Password
            </SubmitButton>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default ChangePasswordModal;
