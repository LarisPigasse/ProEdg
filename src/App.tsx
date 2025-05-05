// src/App.tsx
import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAppDispatch } from "./store/hooks";
import { login, logout } from "./store/slices/authSlice";
import AppRoutes from "./routes";
import { authService } from "./services/authService";

function App() {
  const dispatch = useAppDispatch();

  // Verifica lo stato di autenticazione all'avvio dell'app
  useEffect(() => {
    const initAuth = async () => {
      // Controllo se c'è un token salvato
      const token = authService.getToken();

      if (!token) {
        dispatch(logout());
        return;
      }

      try {
        // Verifica il token con il backend
        const response = await authService.verifyToken();

        // Se valido, imposta l'utente autenticato
        dispatch(
          login({
            user: response.operatore,
            token,
          })
        );
      } catch (error) {
        console.error("Token non valido:", error);
        // Se il token non è valido, effettua il logout
        authService.logout();
        dispatch(logout());
      }
    };

    initAuth();
  }, [dispatch]);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
