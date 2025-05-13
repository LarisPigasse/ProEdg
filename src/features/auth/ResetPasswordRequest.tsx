import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Send, ArrowLeft } from "lucide-react";
import { APP_CONFIG } from "../../app/constants";
import { authService } from "../../features/auth/authService";
import Input from "../../core/components/ui/Input";
import SubmitButton from "../../core/components/ui/SubmitButton";

const ResetPasswordRequest = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError("Inserisci la tua email");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Chiama l'API per richiedere il reset della password
      await authService.requestPasswordReset(email);

      // Imposta success a true per mostrare il messaggio di successo
      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Errore durante l'invio della richiesta");
      }
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white py-12 px-12 shadow-sm">
        {/* Logo e Titolo */}
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <img className="h-24 w-auto" src="/edg.png" alt="EdgPro" />
          </div>
          <div className="flex justify-center items-center font-bold text-2xl">
            <img
              src={APP_CONFIG.ICON_PRO}
              alt={`${APP_CONFIG.NAME} Logo`}
              className="h-6 mr-2" // h-5 equivale a 20px in Tailwind
            />
            <span className="text-sky-500">ed</span>
            <span className="text-stone-600">g</span>
            <span className="text-violet-600 font-semibold ms-0">Pro</span>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-stone-800">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Inserisci la tua email per ricevere il link di reset
          </p>
        </div>

        {success ? (
          /* Schermata di successo */
          <div className="space-y-6">
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="text-sm text-green-700">
                  <p>
                    Abbiamo inviato un link per reimpostare la password
                    all'indirizzo email fornito. Controlla la tua casella di
                    posta.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Link
                to="/login"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Torna al login
              </Link>
            </div>
          </div>
        ) : (
          /* Form di richiesta reset */
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Messaggio di errore */}
            {error && (
              <div className="rounded-md bg-red-50 p-3">
                <div className="flex">
                  <div className="text-sm text-red-600">{error}</div>
                </div>
              </div>
            )}

            <div>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between space-x-4">
              <Link
                to="/login"
                className="flex items-center text-xs text-violet-600 hover:text-violet-700"
              >
                <ArrowLeft className="mr-1 h-3 w-3" />
                Torna al login
              </Link>

              <SubmitButton
                isLoading={loading}
                loadingText="Invio in corso..."
                leftIcon={<Send className="mr-2 h-4 w-4" />}
              >
                Invia link
              </SubmitButton>
            </div>
          </form>
        )}

        {/* Copyright in fondo */}
        <div className="text-center text-xs border-t pt-4 text-stone-600">
          Copyright © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-sky-600">Express Delivery</span>{" "}
          All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordRequest;
