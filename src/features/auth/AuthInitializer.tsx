// src/components/auth/AuthInitializer.tsx
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/store";
import { login, logout } from "../../features/auth/authSlice";
import { authService } from "../../features/auth/authService";
import { APP_CONFIG } from "../../app/constants";

interface AuthInitializerProps {
  children: React.ReactNode;
}

const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      // Controlla se c'è un token nel localStorage
      const token = localStorage.getItem(APP_CONFIG.AUTH_TOKEN_KEY);

      if (token) {
        try {
          // Verifica se il token è valido
          const response = await authService.verifyToken();

          // Se il token è valido, dispatch dell'azione login
          dispatch(
            login({
              user: response.operatore,
              token: token,
            })
          );
        } catch (error) {
          // Se il token non è valido, lo rimuove e esegue il logout
          console.error("Token non valido o scaduto:", error);
          localStorage.removeItem(APP_CONFIG.AUTH_TOKEN_KEY);
          dispatch(logout());
        }
      }

      // Fine del caricamento
      setIsLoading(false);
    };

    initializeAuth();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg">Inizializzazione dell'applicazione...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthInitializer;
