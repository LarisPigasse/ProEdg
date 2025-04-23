import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import MainMenu from "../components/navigation/MainMenu";
import Footer from "../components/layout/Footer";

const MainLayout = () => {
  return (
    <div className="flex h-screen flex-col bg-white">
      {/* Header */}
      <Header />

      {/* Menu */}
      <MainMenu />

      {/* Content */}
      <div className="flex-1 overflow-auto border-t border-gray-100">
        <main className="h-full p-6">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
