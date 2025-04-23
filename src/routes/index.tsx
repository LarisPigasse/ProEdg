import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "../layouts/MainLayout";

// Lazy load delle pagine
const Dashboard = lazy(() => import("../pages/base/Dashboard"));
const NotFound = lazy(() => import("../pages/base/NotFound"));

// Componente di fallback durante il caricamento
const LoadingFallback = () => (
  <div className="flex h-screen items-center justify-center">
    <p className="text-lg">Caricamento in corso</p>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Dashboard />
            </Suspense>
          }
        />

        {/* Altre route verranno aggiunte qui */}

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
