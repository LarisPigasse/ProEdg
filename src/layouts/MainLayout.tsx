import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const MainLayout = () => {
  return (
    <div className="flex h-screen w-full flex-col bg-white">
      {/* Header */}
      <Header />

      {/* Content */}
      <div className="flex-1 w-full overflow-auto border-t border-gray-100 bg-neutral-100">
        <main className="h-full w-full p-4">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
