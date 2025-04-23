import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b border-gray-100 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo e nome app a sinistra */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-semibold text-gray-800">
            EdgProject
          </Link>
        </div>

        {/* Informazioni utente a destra */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Benvenuto, Admin</span>
          <button className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200">
            Profilo
          </button>
          <button className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
