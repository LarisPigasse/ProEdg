// src/components/layout/ConnectionStatus.tsx
import { useState, useEffect } from "react";
import { Wifi, WifiOff } from "lucide-react";
import { APP_CONFIG } from "../../config/constants";

const ConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        setChecking(true);
        // Utilizzo di un endpoint leggero come "health" o "ping"
        const response = await fetch(
          `${APP_CONFIG.API_BASE_URL}/utils/health`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            // Aggiungiamo un timeout per non aspettare troppo a lungo
            signal: AbortSignal.timeout(4000),
          }
        );

        setIsConnected(response.ok);
      } catch (error) {
        console.error("Error checking connection:", error);
        setIsConnected(false);
      } finally {
        setChecking(false);
      }
    };

    // Controlla la connessione all'avvio
    checkConnection();

    // Controlla la connessione periodicamente
    const intervalId = setInterval(checkConnection, 60000); // Ogni minuto

    return () => clearInterval(intervalId);
  }, []);

  // Renderizza l'indicatore di stato una volta completato il controllo iniziale
  if (checking) return null;

  return (
    <div
      className="flex items-center"
      title={isConnected ? "Connesso al server" : "Server non raggiungibile"}
    >
      {isConnected ? (
        <Wifi className="h-3.5 w-3.5 text-green-500" />
      ) : (
        <WifiOff className="h-3.5 w-3.5 text-red-500" />
      )}
      <span className="ml-1 text-xxs text-gray-500">
        {isConnected ? "Connesso" : "Disconnesso"}
      </span>
    </div>
  );
};

export default ConnectionStatus;
