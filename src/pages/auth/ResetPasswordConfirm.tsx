import { useState, FormEvent, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Eye, EyeOff, Save, ArrowLeft } from "lucide-react";
import { APP_CONFIG } from "../../config/constants";
import { authService } from "../../services/authService";

const ResetPasswordConfirm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [validating, setValidating] = useState(true);

  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  // Verifica la validità del token
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setTokenValid(false);
        setValidating(false);
        return;
      }

      try {
        // Chiamata per verificare il token
        await authService.validateResetToken(token);
        setTokenValid(true);
      } catch {
        setTokenValid(false);
        setError("Il link di reset non è valido o è scaduto.");
      } finally {
        setValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Inserisci e conferma la nuova password");
      return;
    }

    if (password !== confirmPassword) {
      setError("Le password non corrispondono");
      return;
    }

    if (password.length < 8) {
      setError("La password deve contenere almeno 8 caratteri");
      return;
    }

    try {
      setLoading(true);
      setError("");

      if (!token) {
        throw new Error("Token mancante");
      }

      // Chiama l'API per confermare il reset della password
      await authService.confirmPasswordReset(token, password);

      // Imposta success a true per mostrare il messaggio di successo
      setSuccess(true);

      // Redirect alla pagina di login dopo 3 secondi
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Errore durante il reset della password");
      }
    } finally {
      setLoading(false);
    }
  };

  // Se stiamo ancora validando il token, mostra un indicatore di caricamento
  if (validating) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-100">
        <div className="text-center">
          <p className="text-gray-600">Verifica in corso...</p>
        </div>
      </div>
    );
  }

  // Se il token non è valido, mostra un messaggio di errore
  if (tokenValid === false) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-sm">
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
              Link non valido
            </h2>
          </div>

          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="text-sm text-red-700">
                <p>
                  {error ||
                    "Il link per il reset della password non è valido o è scaduto."}
                </p>
              </div>
            </div>
          </div>

          <div>
            <Link
              to="/reset-password"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-neutral-300 px-4 py-2 text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              Richiedi un nuovo link
            </Link>
          </div>

          <div className="mt-6 text-center text-xs text-gray-400">
            Copyright © {new Date().getFullYear()}{" "}
            <span className="font-semibold">Express Delivery</span> All rights
            reserved.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-sm">
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
            Nuova Password
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Inserisci la tua nuova password
          </p>
        </div>

        {success ? (
          /* Schermata di successo */
          <div className="space-y-6">
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="text-sm text-green-700">
                  <p>
                    La tua password è stata reimpostata con successo. Sarai
                    reindirizzato alla pagina di login tra pochi secondi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Form di reset password */
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Messaggio di errore */}
            {error && (
              <div className="rounded-md bg-red-50 p-3">
                <div className="flex">
                  <div className="text-sm text-red-600">{error}</div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {/* Campo Nuova Password */}
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  placeholder="Nuova password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-stone-800 placeholder-gray-500 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
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

              {/* Campo Conferma Password */}
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  placeholder="Conferma password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-stone-800 placeholder-gray-500 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
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

            <div className="flex items-center justify-between space-x-4">
              <Link
                to="/login"
                className="flex items-center text-xs text-violet-600 hover:text-violet-700"
              >
                <ArrowLeft className="mr-1 h-3 w-3" />
                Torna al login
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center rounded-md border border-transparent bg-neutral-300 px-4 py-2 text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:bg-sky-300"
              >
                {loading ? (
                  "Salvataggio in corso..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salva password
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Copyright in fondo */}
        <div className="mt-6 text-center text-xs text-gray-400">
          Copyright © {new Date().getFullYear()}{" "}
          <span className="font-semibold">Express Delivery</span> All rights
          reserved.
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
