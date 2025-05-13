import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, ReactNode } from "react";
import { useAppSelector } from "../app/hooks";
import MainLayout from "../layouts/MainLayout";
import { Dashboard, NotFound } from "../features/shared";

// Lazy import delle pagine più pesanti o meno utilizzate
const Login = lazy(() => import("../features/auth/Login"));
const ResetPasswordRequest = lazy(() => import("../features/auth/ResetPasswordRequest"));
const ResetPasswordConfirm = lazy(() => import("../features/auth/ResetPasswordConfirm"));
const ChangePassword = lazy(() => import("../features/auth/ChangePasswordModal"));
const OperatoriList = lazy(() => import("../features/operatori/OperatoriList"));

// Componente di fallback durante il caricamento
const LoadingFallback = () => (
  <div className="flex h-screen items-center justify-center">
    <p className="text-lg">Caricamento in corso</p>
  </div>
);

// Definizione del tipo per le props di ProtectedRoute
interface ProtectedRouteProps {
  children: ReactNode;
}

// Wrapper per route protette. reindirizza alla login le richieste prive di autenticazione
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      {/* Route pubblica per login */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <Suspense fallback={<LoadingFallback />}>
              <Login />
            </Suspense>
          )
        }
      />

      <Route
        path="/reset-password"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <ResetPasswordRequest />
          </Suspense>
        }
      />

      <Route
        path="/reset-password/:token"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <ResetPasswordConfirm />
          </Suspense>
        }
      />

      {/* Route protette */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Dashboard />
            </Suspense>
          }
        />

        <Route
          path="/change-password"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ChangePassword />
            </Suspense>
          }
        />

        <Route
          path="/operatori"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <OperatoriList />
            </Suspense>
          }
        />
        {/* Altre route protette verranno aggiunte qui */}

        {/* Route 404 - Not Found */}
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
