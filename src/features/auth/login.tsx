// src/pages/auth/Login.tsx
import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useAppDispatch } from "../../app/hooks";
import { login } from "../../features/auth/authSlice";
import { APP_CONFIG } from "../../app/constants";
import { authService } from "../../features/auth/authService";
import Input from "../../core/components/ui/Input";
import SubmitButton from "../../core/components/ui/SubmitButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Inserisci email e password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await authService.login({ email, password });

      // Salva token nel localStorage
      localStorage.setItem(APP_CONFIG.AUTH_TOKEN_KEY, data.token);

      // Dispatch dell'azione Redux
      dispatch(
        login({
          user: data.operatore,
          token: data.token,
        })
      );

      // Redirect alla dashboard
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Errore durante il login");
      }
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
          <p className="mt-4 text-sm text-gray-500">
            Inserisci le tue credenziali per accedere
          </p>
        </div>

        {/* Form di login */}
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
            {/* Campo Email con placeholder invece di label */}
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

            {/* Campo Password con placeholder invece di label */}
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3  text-gray-400 hover:text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Pulsante Login */}
          <div>
            <SubmitButton
              isLoading={loading}
              loadingText="Accesso in corso..."
              leftIcon={<LogIn className="h-4 w-4" />}
              fullWidth
            >
              Accedi
            </SubmitButton>
          </div>

          {/* Link per Password dimenticata */}

          <div className="flex items-center justify-center">
            <Link
              to="/reset-password"
              className="text-xs text-violet-600 hover:text-violet-700"
            >
              Password dimenticata? / Reset Password
            </Link>
          </div>
        </form>
        <div className="text-center text-xs border-t pt-4 text-stone-600">
          Copyright © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-sky-600">Express Delivery</span>{" "}
          All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
